import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./index-BE4Fbmwm.js";import{M as l,s as c}from"./Modal-m-eMx2ej.js";import{B as o}from"./Button-DDqaEZzK.js";import"./index-c0qeY2gs.js";import"./compiler-runtime-CJbQ6yvW.js";const j={title:"Molecules/Modal",component:l,args:{children:e.jsx("p",{children:"This is the modal content."})}},s={render:i=>{const[d,n]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(o,{onClick:()=>n(!0),children:"Open Modal"}),e.jsx(l,{...i,isOpen:d,onClose:()=>{n(!1)},children:e.jsxs("div",{className:c.modalContent,children:[e.jsx("h2",{style:{margin:0},children:"Example Modal"}),e.jsx("p",{children:"This is a modal rendered in Storybook."}),e.jsx(o,{onClick:()=>n(!1),children:"Close"})]})})]})}};var t,r,a;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => {
        setIsOpen(false);
      }}>
          <div className={styles.modalContent}>
            <h2 style={{
            margin: 0
          }}>Example Modal</h2>
            <p>This is a modal rendered in Storybook.</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>;
  }
}`,...(a=(r=s.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const C=["Default"];export{s as Default,C as __namedExportsOrder,j as default};
