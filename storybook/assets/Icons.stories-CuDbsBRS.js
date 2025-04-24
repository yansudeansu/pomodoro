import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as r}from"./Icons-BrzpDcnC.js";import"./index-BvYGlo5U.js";import"./index-c0qeY2gs.js";const m={title:"Atoms/Icons",tags:["autodocs"],parameters:{docs:{description:{component:"This story showcases all available icons registered in `AppIcons`. Each icon can be reused across the application using the `icon` prop in `IconButton`, etc."}}}},n={render:()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1.5rem"},children:Object.keys(r).map(s=>{const a=r[s];return e.jsxs("div",{style:{textAlign:"center",width:"64px"},children:[e.jsx(a,{size:28}),e.jsx("div",{style:{fontSize:"0.75rem",marginTop:"0.25rem"},children:s})]},s)})})};var t,o,i;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem'
  }}>
      {(Object.keys(AppIcons) as IconName[]).map(key => {
      const Icon = AppIcons[key];
      return <div key={key} style={{
        textAlign: 'center',
        width: '64px'
      }}>
            <Icon size={28} />
            <div style={{
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>{key}</div>
          </div>;
    })}
    </div>
}`,...(i=(o=n.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const x=["AllIcons"];export{n as AllIcons,x as __namedExportsOrder,m as default};
