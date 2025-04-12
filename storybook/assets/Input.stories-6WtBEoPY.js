import{I as u}from"./Input-DIfo0Vc4.js";import"./jsx-runtime-D_zvdyIk.js";const g={title:"Atoms/Input",component:u,tags:["autodocs"],parameters:{docs:{description:{component:"The `Input` component is a styled wrapper around a standard text input. It supports all native input props and allows custom styling via `className`."}}},argTypes:{placeholder:{control:"text",description:"Placeholder text",defaultValue:"Enter text..."},disabled:{control:"boolean",description:"Whether the input is disabled"},value:{control:"text",description:"The current value"},onChange:{action:"changed"}}},e={args:{placeholder:"Type something..."}},a={args:{placeholder:"Can't type here",disabled:!0}},t={args:{value:"Pre-filled text"}};var r,s,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    placeholder: 'Type something...'
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var n,l,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    placeholder: "Can't type here",
    disabled: true
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var p,d,i;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: 'Pre-filled text'
  }
}`,...(i=(d=t.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const x=["Default","Disabled","WithValue"];export{e as Default,a as Disabled,t as WithValue,x as __namedExportsOrder,g as default};
