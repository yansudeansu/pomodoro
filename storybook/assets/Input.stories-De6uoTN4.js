import{I as b}from"./Input-D5j9VKnD.js";import"./jsx-runtime-D_zvdyIk.js";import"./compiler-runtime-CJbQ6yvW.js";import"./index-c0qeY2gs.js";const I={title:"Atoms/Input",component:b,tags:["autodocs"],parameters:{docs:{description:{component:"The `Input` component is a styled wrapper around a standard text input. It supports all native input props and allows custom styling via `className`."}}},argTypes:{placeholder:{control:"text",description:"Placeholder text",defaultValue:"Enter text..."},disabled:{control:"boolean",description:"Whether the input is disabled"},value:{control:"text",description:"The current value"},onChange:{action:"changed"}}},e={args:{placeholder:"Type something..."}},r={args:{placeholder:"Can't type here",disabled:!0}},a={args:{value:"Pre-filled text"}},s={args:{placeholder:"Borderless input",borderless:!0}};var t,o,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type something...'
  }
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var l,p,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: "Can't type here",
    disabled: true
  }
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,i,u;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 'Pre-filled text'
  }
}`,...(u=(i=a.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var m,h,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Borderless input',
    borderless: true
  }
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const T=["Default","Disabled","WithValue","Borderless"];export{s as Borderless,e as Default,r as Disabled,a as WithValue,T as __namedExportsOrder,I as default};
