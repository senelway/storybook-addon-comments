import queryString from"query-string";import styled from"styled-components";import _defineProperty from"@babel/runtime/helpers/defineProperty";import{createElement,PureComponent}from"react";import firebase from"firebase/app";import"firebase/database";import addons from"@storybook/addons";const ADDON_ID="storybooks/storybook-addon-comments",EVENT_ID=`${ADDON_ID}/event`,RegexpReplace=/ /g,replacerKindStory=(e,t)=>{const n=e=>e.replace(RegexpReplace,"_");return`${n(e)}/${n(t)}`},getParams=()=>queryString.parse(window.location.search),getKindAndStory=()=>replacerKindStory(getParams().selectedKind,getParams().selectedStory),Input=styled.input`
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

`,Container=styled.div`
  padding: 20px;
  width: 100%;
`,Preloader=styled.p`
  margin: 5px 0;
`,Form=styled.form`
  margin-top: 30px;
`;class Comments extends PureComponent{constructor(){super(),_defineProperty(this,"onEventHandler",e=>{const t=this.props.api;firebase.initializeApp(e),t.onStory(()=>this.getFirebaseData())}),_defineProperty(this,"onToggleLoader",()=>this.setState(e=>({isLoading:!e.isLoading}))),_defineProperty(this,"onChange",({currentTarget:e})=>{this.setState({[e.name]:e.value})}),_defineProperty(this,"onSubmit",e=>{e.preventDefault();const t=this.state,n=t.name,a=t.message;this.onToggleLoader(),localStorage.setItem("name",n),firebase.database().ref(getKindAndStory()).push({name:n,message:a,createdAt:(new Date).toLocaleString()}),this.setState({message:""},this.getFirebaseData)}),_defineProperty(this,"getFirebaseData",()=>{this.onToggleLoader(),firebase.database().ref(getKindAndStory()).once("value").then(e=>this.setState({isLoading:!1,data:e.val()}))}),this.state={isLoading:!1,name:localStorage.getItem("name")||"",message:"",data:null}}componentDidMount(){this.props.channel.on(EVENT_ID,this.onEventHandler)}render(){const e=this.state,t=e.name,n=e.message,a=e.isLoading,o=e.data;return createElement(Container,null,a?createElement(Preloader,null,"loading..."):o&&Object.keys(o).map(e=>createElement(Comment,{key:e},createElement(Title,null,o[e].name," ",createElement("span",null,o[e].createdAt)),createElement(Message,null,o[e].message))),createElement(Form,{onSubmit:this.onSubmit},createElement(Input,{required:!0,placeholder:"name",onChange:this.onChange,name:"name",type:"text",value:t,disabled:!!localStorage.getItem("name")}),createElement(Input,{required:!0,placeholder:"message",onChange:this.onChange,name:"message",type:"text",value:n}),createElement(Button,{onSubmit:this.onSubmit,type:"submit"},"submit")))}}var _default$1=_ref;function _ref(){addons.register(ADDON_ID,e=>{const t=addons.getChannel();addons.addPanel(ADDON_ID,{title:"Comments",render:()=>createElement(Comments,{channel:t,api:e})})})}function setCommentsConfig(e){const t=addons.getChannel();if(!t)throw new Error("Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.");t.emit(EVENT_ID,e)}_default$1();var _default$3=setCommentsConfig,_default2=setCommentsConfig;function rewire$3(e){_default$3=e}function restore$3(){_default$3=_default2}export default setCommentsConfig;export{rewire$3 as rewire,restore$3 as restore};
