import{I as b}from"./IconButton-DLG4f09V.js";import"./jsx-runtime-D_zvdyIk.js";import"./compiler-runtime-CJbQ6yvW.js";import"./index-c0qeY2gs.js";import"./Icons-LTYywjph.js";import"./index-BE4Fbmwm.js";const A={title:"Atoms/IconButton",component:b,tags:["autodocs"],parameters:{docs:{description:{component:"The `IconButton` renders an icon-only button that supports variants and sizes. Ideal for compact actions like delete or add."}}},argTypes:{icon:{control:"select",options:["trash","add","sparkle","sparkles","info"],description:"Name of the icon from AppIcons"},variant:{control:"radio",options:["default","success","danger"],description:"Styling variant of the button"},size:{control:"radio",options:["small","medium"],description:"Size of the button and icon"},label:{control:"text",description:"Aria-label for accessibility"},onClick:{action:"clicked"}}},a={args:{icon:"add",size:"medium",variant:"default",label:"Add something"}},e={args:{icon:"add",size:"small",variant:"success",label:"Add task"}},o={args:{icon:"trash",size:"medium",variant:"danger",label:"Delete task"}},s={args:{icon:"info",size:"small",variant:"default",label:"More information"}};var n,r,t;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    icon: 'add',
    size: 'medium',
    variant: 'default',
    label: 'Add something'
  }
}`,...(t=(r=a.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var i,c,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    icon: 'add',
    size: 'small',
    variant: 'success',
    label: 'Add task'
  }
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    icon: 'trash',
    size: 'medium',
    variant: 'danger',
    label: 'Delete task'
  }
}`,...(p=(m=o.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,f,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    icon: 'info',
    size: 'small',
    variant: 'default',
    label: 'More information'
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const D=["Default","SmallSuccess","MediumDanger","InfoIcon"];export{a as Default,s as InfoIcon,o as MediumDanger,e as SmallSuccess,D as __namedExportsOrder,A as default};
