# Unmount Embeddable Flow

## `embeddableFlow.unmount()`

`unmount` removes the `EmbeddableFlow` from the DOM.

```html unmount
<div id="mount-here"> </div>

<script>
  const embeddableFlow = mt.createEmbeddableFlow({ clientToken: "..." });
  embeddableFlow.mount("#mount-here")

  embeddableFlow.unmount()
</script>
```