# LeadBooster Browser API

> 🚧 This is a beta feature and any feedback is welcome through the widget in the bottom right-hand corner.

LeadBooster is a chatbot system that allows web page visitors to better qualify themselves as potential customers. LeadBooster has a browser Javascript API with a global object within the global window scope called `LeadBooster`. This object can be used to **control LeadBooster chat** or **listen to specific events happening inside of the chat**.

Note that the LeadBooster object is available in any code included **after** the LeadBooster embed script, but not before.

> 📘 Before using the LeadBooster browser API, make sure you’re using the latest LeadBooster embed script. We recommend updating the embed script before using this API. You can find the latest script in the Pipedrive web app by going to *Leads > LeadBooster > Live Chat > select the Playbook > Installation > Manual installation*.

<hr />

## Control LeadBooster Chat

<hr />

To control the Leadbooster, you can call the `trigger` method on the LeadBooster global object. You can use the method to `open` or `close` the LeadBooster chat.

```javascript
LeadBooster.trigger('open');  // opens LeadBooster chat
LeadBooster.trigger('close');  // closes LeadBooster chat
```

This is helpful in case you would like to open the LeadBooster in a specific situation, like the click of the “Contact us“ button.

```javascript
document.selectElementById('contact-button').addEventListener('click',function() {
  LeadBooster.trigger('open');
});
```

<hr />

## Listen to LeadBooster Chat events

<hr />

You can listen to events happening inside of the LeadBooster chat and use the events to trigger your own code. The events can also include an optional data object with additional helpful information.

```javascript
LeadBooster.on('conversationEnded', function(data) {
  // code here will be triggered when the conversation ends
  // data object includes a 'qualified' boolean property
});
```

This functionality can be used to trigger analytics events.

```javascript
LeadBooster.on('conversationEnded', function(data) {
  if (data.qualified) {
    dataLayer.push('qualified_lead');
  } else {
    dataLayer.push('disqualified_lead');
  }
});
```

The list of all events includes:

* `initialized` - called when LeadBooster chat is initialized and appears on the webpage.
* `opened` - called when LeadBooster chat is opened.
* `closed` -  called when LeadBooster chat is closed.
* `greetingOpened` - called when LeadBooster chat greeting message is displayed.
* `greetingClosed` - called when LeadBooster chat greeting message is closed (by opening the chat or closing the greeting message with close button).
* `conversationEnded` - called when the conversation with the bot ends. Additional data includes `qualified` boolean property.