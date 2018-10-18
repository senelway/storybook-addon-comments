import styled from"styled-components";import _defineProperty from"@babel/runtime/helpers/defineProperty";import{createElement,PureComponent}from"react";import firebase from"firebase/app";import"firebase/database";import{Grid,Row,Col}from"reflexer";import addons from"@storybook/addons";const ADDON_ID="storybooks/storybook-addon-comments",EVENT_ID=`${ADDON_ID}/comments-event`,Input=styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid rgba(0,0,0,0.1);

  &[disabled] {
    cursor: no-drop;
    background-color: #e5e5e5;
  }
`,Comment=styled.div`
  display: block;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`,Title=styled.p`
  color: rgba(0,0,0,0.4);
`,Button=styled.button`
  border: 0;
  padding: 5px;
  min-width: 100px;
  display: block;
  box-shadow: none;
  background-color: #e5e5e5;
`,Message=styled.p`

`;class Comments extends PureComponent{constructor(){super(),_defineProperty(this,"onEventHandler",e=>{firebase.initializeApp(e),this.getData()}),_defineProperty(this,"onToggleLoader",()=>this.setState(e=>({isLoading:!e.isLoading}))),_defineProperty(this,"onChange",({currentTarget:e})=>{this.setState({[e.name]:e.value})}),_defineProperty(this,"onSubmit",e=>{e.preventDefault();const t=this.state,o=t.name,n=t.message;this.props.api.onStory((e,t)=>{localStorage.setItem("name",o),firebase.database().ref(`${e}/${t}`).push({name:o,message:n,createdAt:(new Date).toLocaleString()}),this.getData()})}),_defineProperty(this,"getData",()=>{this.onToggleLoader(),this.props.api.onStory((e,t)=>firebase.database().ref(`${e}/${t}`).once("value").then(e=>this.setState({isLoading:!1,data:e.val()||{}})))}),this.state={isLoading:!1,name:localStorage.getItem("name",""),message:"",data:{}}}componentDidMount(){this.props.channel.on(EVENT_ID,this.onEventHandler)}render(){const e=this.state,t=e.name,o=e.message,n=e.isLoading,a=e.data;return createElement(Grid,{fluid:!0},n&&createElement("div",null,"loading..."),createElement(Row,null,createElement(Col,{basis:{xs:12,md:8}},a&&Object.keys(a).map(e=>createElement(Comment,{key:e},createElement(Title,null,a[e].name," ",createElement("span",null,a[e].createdAt)),createElement(Message,null,a[e].message)))),createElement(Col,{as:"form",basis:{xs:12,md:4},onSubmit:this.onSubmit},createElement(Input,{required:!0,onChange:this.onChange,name:"name",type:"text",value:t,disabled:!!localStorage.getItem("name")}),createElement(Input,{required:!0,placeholder:"message",onChange:this.onChange,name:"message",type:"text",value:o}),createElement(Button,{onSubmit:this.onSubmit,type:"submit"},"submit"))))}}var _default$1=_ref;function _ref(){addons.register(ADDON_ID,e=>{const t=addons.getChannel();addons.addPanel(ADDON_ID,{title:"Comments",render:()=>createElement(Comments,{channel:t,api:e})})})}function setCommentsConfig(e){const t=addons.getChannel();if(!t)throw new Error("Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.");t.emit(EVENT_ID,e)}_default$1();var _default$3=setCommentsConfig,_default2=setCommentsConfig;function rewire$3(e){_default$3=e}function restore$3(){_default$3=_default2}export default setCommentsConfig;export{rewire$3 as rewire,restore$3 as restore};
