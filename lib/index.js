"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var queryString=_interopDefault(require("query-string")),styled=_interopDefault(require("styled-components")),_defineProperty=_interopDefault(require("@babel/runtime/helpers/defineProperty")),React=require("react"),firebase=_interopDefault(require("firebase/app"));require("firebase/database");var addons=_interopDefault(require("@storybook/addons"));const ADDON_ID="storybooks/storybook-addon-comments",EVENT_ID=`${ADDON_ID}/event`,RegexpReplace=/ /g,replacerKindStory=(e,t)=>{const a=e=>e.replace(RegexpReplace,"_");return`${a(e)}/${a(t)}`},getParams=()=>queryString.parse(window.location.search),getKindAndStory=()=>replacerKindStory(getParams().selectedKind,getParams().selectedStory),Input=styled.input`
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
`;class Comments extends React.PureComponent{constructor(){super(),_defineProperty(this,"onEventHandler",e=>{const t=this.props.api;firebase.initializeApp(e),t.onStory(()=>this.getFirebaseData())}),_defineProperty(this,"onToggleLoader",()=>this.setState(e=>({isLoading:!e.isLoading}))),_defineProperty(this,"onChange",({currentTarget:e})=>{this.setState({[e.name]:e.value})}),_defineProperty(this,"onSubmit",e=>{e.preventDefault();const t=this.state,a=t.name,r=t.message;this.onToggleLoader(),localStorage.setItem("name",a),firebase.database().ref(getKindAndStory()).push({name:a,message:r,createdAt:(new Date).toLocaleString()}),this.setState({message:""},this.getFirebaseData)}),_defineProperty(this,"getFirebaseData",()=>{this.onToggleLoader(),firebase.database().ref(getKindAndStory()).once("value").then(e=>this.setState({isLoading:!1,data:e.val()}))}),this.state={isLoading:!1,name:localStorage.getItem("name")||"",message:"",data:null}}componentDidMount(){this.props.channel.on(EVENT_ID,this.onEventHandler)}render(){const e=this.state,t=e.name,a=e.message,r=e.isLoading,n=e.data;return React.createElement(Container,null,r?React.createElement(Preloader,null,"loading..."):n&&Object.keys(n).map(e=>React.createElement(Comment,{key:e},React.createElement(Title,null,n[e].name," ",React.createElement("span",null,n[e].createdAt)),React.createElement(Message,null,n[e].message))),React.createElement(Form,{onSubmit:this.onSubmit},React.createElement(Input,{required:!0,placeholder:"name",onChange:this.onChange,name:"name",type:"text",value:t,disabled:!!localStorage.getItem("name")}),React.createElement(Input,{required:!0,placeholder:"message",onChange:this.onChange,name:"message",type:"text",value:a}),React.createElement(Button,{onSubmit:this.onSubmit,type:"submit"},"submit")))}}var _default$1=_ref;function _ref(){addons.register(ADDON_ID,e=>{const t=addons.getChannel();addons.addPanel(ADDON_ID,{title:"Comments",render:()=>React.createElement(Comments,{channel:t,api:e})})})}function setCommentsConfig(e){const t=addons.getChannel();if(!t)throw new Error("Failed to find addon channel. This may be due to https://github.com/storybooks/storybook/issues/1192.");t.emit(EVENT_ID,e)}_default$1(),exports.default=setCommentsConfig;var _default2=exports.default;function rewire$3(e){exports.default=e}function restore$3(){exports.default=_default2}exports.rewire=rewire$3,exports.restore=restore$3;
