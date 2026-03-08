# Mount Embeddable Flow

## `embeddableFlow.mount(cssSelectorOrDomElement)`

##

`mount` adds the `EmbeddableFlow` to the DOM.  It takes a single argument that can be either\
a valid CSS selector or a DOM element. Note that:

* If a CSS selector matches multiple DOM elements, then the flow will be added to the first matching element.
* If the flow is already mounted, this method will do nothing.
* [Void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) cannot have children, so cannot be mounted to.

```html CSS Selector
<div id="mount-here"> </div>

<script>
  const embeddableFlow = mt.createEmbeddableFlow({ clientToken: "..." });
  embeddableFlow.mount("#mount-here")
</script>
```

```html DOM Element
<div id="mount-here"> </div>

<script>
  const embeddableFlow = mt.createEmbeddableFlow({ clientToken: "..." });
  const element = document.querySelector("#mount-here")
  
  embeddableFlow.mount(element)
</script>
```