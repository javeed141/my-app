#!/bin/bash
# Script to scan MDX files for errors, excluding content inside code blocks

RESULTS_DIR="/d/Projects/NEXTJSPROJECT/my-app/convert-results"

# Function: strip code blocks from a file and output with original line numbers preserved
# Lines inside code blocks are replaced with empty lines to preserve line numbering
strip_code_blocks() {
    awk '
    /^```/ { in_code = !in_code; print ""; next }
    in_code { print ""; next }
    { print }
    ' "$1"
}

echo "=========================================="
echo "ERROR TYPE 1: Non-Doc.AI Components"
echo "=========================================="

# Valid components list
VALID="Callout|Card|Columns|Column|Image|Video|Iframe|CodeGroup|Expandable|ExpandableGroup|Steps|Step|Tabs|Tab|Update|ParamField|ResponseField|Request|Response|Frame|Icon"

# Common HTML tags to exclude
HTML_TAGS="a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|slot|small|source|span|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|svg|path|circle|rect|line|polyline|polygon|ellipse|g|defs|use|symbol|text|tspan|clipPath|mask|pattern|linearGradient|radialGradient|stop|filter|feGaussianBlur|feMerge|feMergeNode|feOffset|feBlend|feColorMatrix|feComponentTransfer|feFuncR|feFuncG|feFuncB|feFuncA|feComposite|feConvolutionMatrix|feDiffuseLighting|feDisplacementMap|feFlood|feImage|feMorphology|feSpecularLighting|feTile|feTurbulence"

find "$RESULTS_DIR" -name "converted.mdx" | sort | while read -r file; do
    stripped=$(strip_code_blocks "$file")
    # Find PascalCase tags (opening or self-closing)
    echo "$stripped" | grep -nP '<[A-Z][A-Za-z]+[\s/>]' | while read -r line; do
        lineno=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        # Extract the tag name
        tags=$(echo "$content" | grep -oP '<[A-Z][A-Za-z]+' | sed 's/<//' | sort -u)
        for tag in $tags; do
            # Check if it's a valid Doc.AI component
            if ! echo "$tag" | grep -qP "^($VALID)$"; then
                relpath=${file#$RESULTS_DIR/}
                echo "  FILE: $relpath"
                echo "  LINE: $lineno"
                echo "  TAG: <$tag>"
                echo "  CONTENT: $(echo "$content" | head -c 200)"
                echo "  ---"
            fi
        done
    done
done

echo ""
echo "=========================================="
echo "ERROR TYPE 2: Raw Curly Braces Outside Code Blocks"
echo "=========================================="

find "$RESULTS_DIR" -name "converted.mdx" | sort | while read -r file; do
    stripped=$(strip_code_blocks "$file")
    echo "$stripped" | grep -nP '\{|\}' | while read -r line; do
        lineno=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        # Skip JSX comments {/* ... */}
        # Skip JSX expressions like cols={2}, kind="info", src={...}
        # Skip lines that are JSX attribute assignments
        # We want to find raw { or } in prose
        # Skip if line is a JSX comment
        if echo "$content" | grep -qP '^\s*\{/\*.*\*/\}\s*$'; then continue; fi
        # Skip if all braces are part of JSX attributes like ={...}
        cleaned=$(echo "$content" | sed 's/=\{[^}]*\}//g' | sed 's/\{\/\*.*\*\/\}//g' | sed 's/\{" "\}//g' | sed 's/\{`[^`]*`\}//g')
        if ! echo "$cleaned" | grep -qP '\{|\}'; then continue; fi
        # Skip frontmatter
        if echo "$content" | grep -qP '^\s*"'; then continue; fi
        # Skip if it's a JSX component line with only attribute braces
        if echo "$content" | grep -qP '^\s*<'; then
            cleaned2=$(echo "$content" | sed 's/=\{[^}]*\}//g' | sed 's/\{\/\*.*\*\/\}//g')
            if ! echo "$cleaned2" | grep -qP '\{|\}'; then continue; fi
        fi
        relpath=${file#$RESULTS_DIR/}
        echo "  FILE: $relpath"
        echo "  LINE: $lineno"
        echo "  CONTENT: $(echo "$content" | head -c 200)"
        echo "  ---"
    done
done

