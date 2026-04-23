# Custom Icons

## Font Awesome

ReadMe loads Font Awesome 6's [Regular](https://fontawesome.com/search?s=regular\&f=classic\&o=r) and [Duotone](https://fontawesome.com/search?s=solid\&f=duotone\&o=r) libraries, and you can use them in your docs!

<HTMLBlock>
  {`
  <div class="Flex">
    <i class="fa-duotone fa-solid fa-house"></i>
    <i class="fa-duotone fa-solid fa-copyright"></i>
    <i class="fa-duotone fa-solid fa-bomb"></i>
    <i class="fa-duotone fa-solid fa-umbrella"></i>
    <i class="fa-duotone fa-solid fa-paper-plane"></i>
    <i class="fa-duotone fa-solid fa-computer-classic"></i>
    <i class="fa-duotone fa-solid fa-crab"></i>
    <i class="fa-duotone fa-solid fa-bullseye-pointer"></i>
    <i class="fa-duotone fa-solid fa-wheelchair-move"></i>
    <i class="fa-duotone fa-solid fa-table-tennis-paddle-ball"></i>
  </div>
  `}
</HTMLBlock>

```
<i class="fa-duotone fa-solid fa-house"></i>
<i class="fa-duotone fa-solid fa-copyright"></i>
<i class="fa-duotone fa-solid fa-bomb"></i>
<i class="fa-duotone fa-solid fa-umbrella"></i>
<i class="fa-duotone fa-solid fa-paper-plane"></i>
<i class="fa-duotone fa-solid fa-computer-classic"></i>
<i class="fa-duotone fa-solid fa-crab"></i>
<i class="fa-duotone fa-solid fa-bullseye-pointer"></i>
<i class="fa-duotone fa-solid fa-wheelchair-move"></i>
<i class="fa-duotone fa-solid fa-table-tennis-paddle-ball"></i>
```

***

### Accessibility

If an icon is used decoratively, you can mark an icon as hidden. For example, using it next to an appropriate text label:

```html
<button>
  <i aria-hidden="true" class="fa-duotone fa-solid fa-computer-classic"></i>
  Download to Floppy
</button>
```

If your icon should be interpreted semantically, use the `aria-label` attribute:

```html
<i aria-label="Download to Floppy" class="fa-duotone fa-solid fa-computer-classic"></i>
```

You can refer to Font Awesome's [docs on accessibility](https://docs.fontawesome.com/web/dig-deeper/accessibility) for more information.