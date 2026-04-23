# Accessibility Report

Report Date: April 18, 2025

ReadMe runs daily automated tests against the [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) standard using the axe-core library. As of this report there are no reported issues. In addition to the automated tests, ReadMe also uses a third-party to manually audit for issues and the results of both are covered by this report.

| Covered                    | Standard    |
| :------------------------- | :---------- |
| Automated Tests (axe-core) | WCAG 2.1 AA |
| Manual Tests               | WCAG 2.1 AA |

## Conformance Levels

* **Compliant:** The criterion is met without known defects or meets with equivalent facilitation.
* **Partial Compliance:** Some functionality does not meet the criterion.
* **Not Compliant:** The majority of functionality does not meet the criterion.
* **Not Applicable:** The criterion is not relevant.

***

## WCAG 2.1 Report

### Table 1: Level A

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance
      </th>

      <th>
        Comment
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [1.1.1 Non-text Content](https://www.w3.org/TR/WCAG20/#text-equiv-all) (Level A)
        All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.

        * **Controls, Input**: If non-text content is a control or accepts user input, then it has a name that describes its purpose. (Refer to Guideline 4.1 for additional requirements for controls and content that accepts user input.)
        * **Time-Based Media**: If non-text content is time-based media, then text alternatives at least provide descriptive identification of the non-text content. (Refer to Guideline 1.2 for additional requirements for media.)
        * **Test**: If non-text content is a test or exercise that would be invalid if presented in text, then text alternatives at least provide descriptive identification of the non-text content.
        * **Sensory**: If non-text content is primarily intended to create a specific sensory experience, then text alternatives at least provide descriptive identification of the non-text content.
        * **CAPTCHA**: If the purpose of non-text content is to confirm that content is being accessed by a person rather than a computer, then text alternatives that identify and describe the purpose of the non-text content are provided, and alternative forms of CAPTCHA using output modes for different types of sensory perception are provided to accommodate different disabilities.
        * **Decoration, Formatting, Invisible**: If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.2.1 Audio-only and Video-only](https://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt) (Prerecorded) (Level A)\
        For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:

        * **Prerecorded Audio-only**: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content.
        * **Prerecorded Video-only**: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can display prerecorded audio-only and video-only media, ReadMe does not provide the source material or alternative media.
      </td>
    </tr>

    <tr>
      <td>
        [1.2.2 Captions](https://www.w3.org/TR/WCAG20/#media-equiv-captions) (Prerecorded) (Level A)\
        Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can display captioned media, ReadMe does not provide the source material or captions.
      </td>
    </tr>

    <tr>
      <td>
        [1.2.3 Audio Description or Media Alternative](https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc) (Prerecorded) (Level A)\
        Captions are provided for all live audio content in synchronized media.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can display captioned media, ReadMe does not provide the source material or captions.
      </td>
    </tr>

    <tr>
      <td>
        [1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic) (Level A)\
        Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
      </td>

      <td>
        Partial Compliance
      </td>

      <td>
        Most information, structure, and relationship information is compliant. Exception:

        * The header sub-navigation is not placed inside an unordered list.
      </td>
    </tr>

    <tr>
      <td>
        [1.3.2 Meaningful Sequence](https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence) (Level A)\
        When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.3.3 Sensory Characteristics](http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding) (Level A)\
        Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.

        Note: For requirements related to color, refer to Guideline 1.4.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.1 Use of Color](http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color) (Level A)\
        Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

        Note: This success criterion addresses color perception specifically. Other forms of perception are covered in Guideline 1.3 including programmatic access to color and other visual presentation coding
      </td>

      <td>
        Partial Compliance
      </td>

      <td>
        Most information and actions do not rely solely on color as an indicator. Exception:

        * Changelog titles in dark mode only rely on size to differentiate as a link and heading.
      </td>
    </tr>

    <tr>
      <td>
        [1.4.2 Audio Control](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio) (Level A)\
        If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.

        Note: Since any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the Web page (whether or not it is used to meet other success criteria) must meet this success criterion. See Conformance Requirement 5: Non-Interference.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can play audio, ReadMe does not control the source audio behavior.
      </td>
    </tr>

    <tr>
      <td>
        [2.1.1 Keyboard](https://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable) (Level A)\
        All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

        Note 1: This exception relates to the underlying function, not the input technique. For example, if using handwriting to enter text, the input technique (handwriting) requires path-dependent input but the underlying function (text input) does not.

        Note 2: This does not forbid and should not discourage providing mouse input or other input methods in addition to keyboard operation.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG20/#keyboard-operation-trapping) (Level A)\
        If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.

        Note: Since any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the Web page (whether it is used to meet other success criteria or not) must meet this success criterion. See Conformance Requirement 5: Non-Interference.
      </td>

      <td>
        Partial Compliance
      </td>

      <td>
        Most components that are keyboard accessible can use a standard exit method. Exception:

        * The Markdown editor on the discussions page uses a non-standard exit method.
      </td>
    </tr>

    <tr>
      <td>
        [2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG21/#character-key-shortcuts) (Level A 2.1 only)\
        If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:

        * **Turn off**: A mechanism is available to turn the shortcut off;
        * **Remap**: A mechanism is available to remap the shortcut to include one or more non-printable keyboard keys (e.g., Ctrl, Alt);
        * **Active only on focus**: The keyboard shortcut for a user interface component is only active when that component has focus.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.2.1 Timing Adjustable](https://www.w3.org/TR/WCAG20/#time-limits-required-behaviors) (Level A)\
        For each time limit that is set by the content, at least one of the following is true:

        * **Turn off**: The user is allowed to turn off the time limit before encountering it; or
        * **Adjust**: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or
        * **Extend**: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or
        * **Real-time Exception**: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or
        * **Essential Exception**: The time limit is essential and extending it would invalidate the activity; or
        * **20 Hour Exception**: The time limit is longer than 20 hours.

        Note: This success criterion helps ensure that users can complete tasks without unexpected changes in content or context that are a result of a time limit. This success criterion should be considered in conjunction with Success Criterion 3.2.1, which puts limits on changes of content or context as a result of user action.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG20/#time-limits-pause): For moving, blinking, scrolling, or auto-updating information, all of the following are true: (Level A)

        * **Moving, blinking, scrolling**: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and
        * **Auto-updating**: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.
          <br />

        Note 1: For requirements related to flickering or flashing content, refer to Guideline 2.3.

        Note 2: Since any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the Web page (whether it is used to meet other success criteria or not) must meet this success criterion. See Conformance Requirement 5: Non-Interference.

        <br />

        Note 3: Content that is updated periodically by software or that is streamed to the user agent is not required to preserve or present information that is generated or received between the initiation of the pause and resuming presentation, as this may not be technically possible, and in many situations could be misleading to do so.

        <br />

        Note 4: An animation that occurs as part of a preload phase or similar situation can be considered essential if interaction cannot occur during that phase for all users and if not indicating progress could confuse users or cause them to think that content was frozen or broken.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/TR/WCAG20/#seizure-does-not-violate) (Level A)\
        Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red
        flash thresholds.

        <br />

        Note: Since any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the Web page (whether it is used to meet other success criteria or\
        not) must meet this success criterion. See Conformance Requirement

        <br />

        5: Non-Interference.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.1 Bypass Blocks](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) (Level A)\
        A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.
      </td>

      <td>
        Partial Compliance
      </td>

      <td>
        A link to skip pages’ headers and navigation is provided as the first element in focus order. Exception:

        * In specific configurations, the landing page skip link may bypass content that may be considered main content.
      </td>
    </tr>

    <tr>
      <td>
        [2.4.2 Page Titled](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-title) (Level A)\
        Web pages have titles that describe topic or purpose.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.3 Focus Order](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order) (Level A)\
        If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.4 Link Purpose (In Context) ](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs) (Level A)\
        The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.5.1 Pointer Gestures](https://www.w3.org/TR/WCAG21/#pointer-gestures) (Level A 2.1 only)\
        All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG21/#pointer-cancellation) (Level A 2.1 only)\
        For functionality that can be operated using a single pointer, at least one of the following is true:

        * **No Down-Event**: The down-event of the pointer is not used to execute any part of the function;
        * **Abort or Undo**: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;
        * **Up Reversal**: The up-event reverses any outcome of the preceding down-event;
        * **Essential**: Completing the function on the down-event is essential
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.5.3 Label in Name](https://www.w3.org/TR/WCAG21/#label-in-name) (Level A 2.1 only)\
        For user interface components with labels that include text or images of text, the name contains the text that is presented visually.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG21/#motion-actuation) (Level A 2.1 only)\
        Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:

        * **Supported Interface**: The motion is used to operate functionality through an accessibility supported interface;
        * **Essential**: The motion is essential for the function and doing so would invalidate the activity.
      </td>

      <td>
        Not Applicable
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.1.1 Language of Page](https://www.w3.org/TR/WCAG20/#meaning-doc-lang-id) (Level A)\
        The default human language of each Web page can be programmatically determined.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.2.1 On Focus](https://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus) (Level A)\
        When any user interface component receives focus, it does not initiate a change of context.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.2.2 On Input](https://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change) (Level A)\
        Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.3.1 Error Identification](https://www.w3.org/TR/WCAG20/#minimize-error-identified) (Level A)\
        If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.3.2 Labels or Instructions](https://www.w3.org/TR/WCAG20/#minimize-error-cues) (Level A)\
        Labels or instructions are provided when content requires user input.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [4.1.1 Parsing](https://www.w3.org/TR/WCAG20/#ensure-compat-parses) (Level A)\
        In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.

        <br />

        Note: Start and end tags that are missing a critical character in their formation, such as a closing angle bracket or a mismatched attribute value quotation mark are not complete.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG20/#ensure-compat-rsv) (Level A)\
        For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.

        <br />

        Note: This success criterion is primarily for Web authors who develop or script their own user interface components. For example, standard HTML controls already meet this success criterion when used according to specification.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>
  </tbody>
</Table>

***

### Table 2: Level AA

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Criteria
      </th>

      <th>
        Conformance
      </th>

      <th>
        Comment
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [1.2.4 Captions (Live)](https://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions) (Level AA)
        Captions are provided for all live audio content in synchronized media.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can play audio media, ReadMe does not provide the source material or captions.
      </td>
    </tr>

    <tr>
      <td>
        [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only) (Level AA)
        Audio description is provided for all prerecorded video content in synchronized media.
      </td>

      <td>
        Not Applicable
      </td>

      <td>
        While ReadMe can play audio media, ReadMe does not provide the source material or descriptions.
      </td>
    </tr>

    <tr>
      <td>
        [1.3.4 Orientation](https://www.w3.org/TR/WCAG21/#orientation) (Level AA 2.1 only)
        Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.3.5 Identify Input Purpose](https://www.w3.org/TR/WCAG21/#identify-input-purpose) (Level AA 2.1 only)
        The purpose of each input field collecting information about the user can be programmatically determined when:

        * The input field serves a purpose identified in the Input Purposes for User Interface Components section; and
        * The content is implemented using technologies with support for
          identifying the expected meaning for form input data.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) (Level AA)\
        The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:

        * **Large Text**: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;
        * **Incidental**: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to\
          anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
        * **Logotypes**: Text that is part of a logo or brand name has no contrast requirement.
      </td>

      <td>
        Partial Compliance
      </td>

      <td>
        Most text in ReadMe meets minimum contrast requirements. Exceptions:

        * Recipes: Embed tile
        * API Reference: Required label
        * API Reference: Code syntax highlighter
        * Navigation: GET method label
        * Log in and Sign up pages
      </td>
    </tr>

    <tr>
      <td>
        [1.4.4 Resize text](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale) (Level AA)\
        Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.5 Images of Text](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation) (Level AA)\
        If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:

        * **Customizable**: The image of text can be visually customized to the user's requirements;
        * **Essential**: A particular presentation of text is essential to the information being conveyed.

        Note: Logotypes (text that is part of a logo or brand name) are considered essential.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.10 Reflow](https://www.w3.org/TR/WCAG21/#reflow) (Level AA 2.1 only)\
        Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:

        * Vertical scrolling content at a width equivalent to 320 CSS pixels;
        * Horizontal scrolling content at a height equivalent to 256 CSS pixels; Except for parts of the content which require two-dimensional layout for usage or meaning.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast) (Level AA 2.1 only)\
        The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):

        * **User Interface Components**: Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;
        * **Graphical Objects**: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [**1.4.12 Text Spacing**](https://www.w3.org/TR/WCAG21/#text-spacing) (Level AA 2.1 only)\
        In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property:

        * Line height (line spacing) to at least 1.5 times the font size;
        * Spacing following paragraphs to at least 2 times the font size;
        * Letter spacing (tracking) to at least 0.12 times the font size;
        * Word spacing to at least 0.16 times the font size.

        Exception: Human languages and scripts that do not make use of one or more of these text style properties in written text can conform using only the properties that exist for that combination of language and script.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus) (Level AA 2.1 only)\
        Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:

        * **Dismissible**: A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus, unless the additional content communicates an input error or does not obscure\
          or replace other content;
        * **Hoverable**: If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the additional content disappearing;
        * **Persistent**: The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

        Exception: The visual presentation of the additional content is controlled by the user agent and is not modified by the author.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.5 Multiple Ways](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc) (Level AA)\
        More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.6 Headings and Labels](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive) (Level AA)\
        Headings and labels describe topic or purpose.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [2.4.7 Focus Visible](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible) (Level AA)\
        Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.1.2 Language of Parts](https://www.w3.org/TR/WCAG20/#meaning-other-lang-id) (Level AA)\
        The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.2.3 Consistent Navigation](https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations) (Level AA)\
        Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.2.4 Consistent Identification](https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality) (Level AA)\
        Components that have the same functionality within a set of Web pages are identified consistently.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.3.3 Error Suggestion](https://www.w3.org/TR/WCAG20/#minimize-error-suggestions) (Level AA)\
        If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [3.3.4 Error Prevention](https://www.w3.org/TR/WCAG20/#minimize-error-reversible) (Legal, Financial, Data) (Level AA)\
        For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the
        following is true:

        * **Reversible**: Submissions are reversible.
        * **Checked**: Data entered by the user is checked for input errors and the user is provided an opportunity to correct them.
        * **Confirmed**: A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>

    <tr>
      <td>
        [4.1.3 Status Messages](https://www.w3.org/TR/WCAG21/#status-messages) (Level AA 2.1 only)\
        In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
      </td>

      <td>
        Compliant
      </td>

      <td />
    </tr>
  </tbody>
</Table>

<br />

## Updates

5/6/2025: Added note on API Reference: Code syntax highlighter to 1.4.3

<HTMLBlock>
  {`
  <style>
    .markdown-body table {
      font-size: 12px;
      
      td {
        vertical-align: top;
      }
    }
  </style>
  `}
</HTMLBlock>