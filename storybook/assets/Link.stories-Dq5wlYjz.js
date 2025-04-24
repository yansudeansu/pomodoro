import{L as u}from"./Link-C19A5Oq-.js";import"./jsx-runtime-D_zvdyIk.js";import"./compiler-runtime-CJbQ6yvW.js";import"./index-c0qeY2gs.js";import"./Icons-BrzpDcnC.js";import"./index-BvYGlo5U.js";const I={title:"Atoms/Link",component:u,tags:["autodocs"],parameters:{docs:{description:{component:"The `Link` component renders a styled anchor (`<a>`) tag. It supports both internal and external links, and optionally displays an external link icon when `showIcon` is set to `true`."}}},argTypes:{href:{control:"text",description:"The destination URL of the link",defaultValue:"https://example.com"},children:{control:"text",description:"Link text or content",defaultValue:"Click me"},external:{control:"boolean",description:"If true, opens the link in a new tab and adds appropriate `rel` attributes"},showIcon:{control:"boolean",description:"If true, shows an external link icon (only for external links)"}}},e={args:{href:"/about",children:"Go to About Page",external:!1,showIcon:!1}},n={args:{href:"https://github.com/yansudeansu/pomodoro",children:"View on GitHub",external:!0,showIcon:!0}},o={args:{href:"https://example.com",children:"Visit external site (no icon)",external:!0,showIcon:!1}};var t,r,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    href: '/about',
    children: 'Go to About Page',
    external: false,
    showIcon: false
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var s,i,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/yansudeansu/pomodoro',
    children: 'View on GitHub',
    external: true,
    showIcon: true
  }
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var l,p,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    href: 'https://example.com',
    children: 'Visit external site (no icon)',
    external: true,
    showIcon: false
  }
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const b=["InternalLink","ExternalLink","ExternalNoIcon"];export{n as ExternalLink,o as ExternalNoIcon,e as InternalLink,b as __namedExportsOrder,I as default};
