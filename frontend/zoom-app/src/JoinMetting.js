

// import React, { useEffect, useRef,memo } from 'react';
// import config from "../src/lib/config";
// import { randomID, getUrlParams, getRandomName } from "../src/lib/util";
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function JoinMeeting() {
//     const {roomID}=useParams();

//     console.log(roomID,"kl")
//   const root = useRef(null);
//   useEffect(() => {
//     let isMounted = true;
//     const fetchData=async()=>{
//       try {
//         if (isMounted && root.current) {
//           const userID = randomID(5);
//           const appID = config.appID;
//           let UIKitsConfig = {};
    
//           try {
//             UIKitsConfig = JSON.parse(
//               config.UIKitsConfig.replace(/\n|\t/g, "")
//                 .replace(/(\w+):/g, '"$1":')
//                 .replace(/,\s+\}/g, "}")
//             );
//           } catch (error) {
//             console.error('Error parsing UIKitsConfig JSON:', error);
//           }
    
//         //   const roomID = getUrlParams().get("roomID") || randomID(5);
//           const role = getUrlParams().get("role") || "Host";
//           const sharedLinks = [];
//           if (UIKitsConfig.scenario && UIKitsConfig.scenario.mode) {
//             if (UIKitsConfig.scenario.mode === "OneONoneCall") {
//               sharedLinks.push({
//                 name: "Personal link",
//                 url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
//               });
//             } else if (UIKitsConfig.scenario.mode === "LiveStreaming") {
//               UIKitsConfig.scenario.config.role = role;
//               if (role === "Cohost" || role === "Host") {
//                 sharedLinks.push({
//                   name: "Join as co-host",
//                   url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Cohost`,
//                 });
//               } else {
//                 UIKitsConfig = { scenario: UIKitsConfig.scenario };
//               }
//               sharedLinks.push({
//                 name: "Join as audience",
//                 url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Audience`,
//               });
//             } else if (["VideoConference", "GroupCall"].includes(UIKitsConfig.scenario.mode)) {
//               sharedLinks.push({
//                 name: "Personal link",
//                 url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
//               });
//             }
//           }
    
//           const data={
//             userId:userID,appId:config.appID,secret:config.serverSecret,
//             effectiveTimeInSeconds: 7200,
//             payload:""
//           }
    
//           const res=await axios.post("http://localhost:8009/api/token",data)
//                       const { ZegoUIKitPrebuilt } = await import(
//                 "@zegocloud/zego-uikit-prebuilt"

//               );
//               const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, res?.data?.token, roomID, userID, getRandomName());
//               const zp = ZegoUIKitPrebuilt.create(kitToken);
//               zp.joinRoom({
//                 container: root.current,
//                 turnOnMicrophoneWhenJoining: true,
//            	turnOnCameraWhenJoining: true,
//            	showMyCameraToggleButton: true,
//            	showMyMicrophoneToggleButton: true,
//            	showAudioVideoSettingsButton: true,
//            	showScreenSharingButton: true,
//            	showTextChat: true,
//            	showUserList: true,
//              layout: "Grid",
//            	showLayoutButton: true,
//                 sharedLinks,
//                 ...UIKitsConfig,
//                 scenario: {
//                   mode: "VideoConference",
//                   config: {
//                     role: "Host",
//                 },
//               },
//               },
//             );
//         } 
//       } catch (error) {
        
//       }
//     }
//     fetchData();
//     return ()=>{
//       isMounted=false;
//     }
//   }, []);

//   return (
//     <>
//       <div>Meeting User One {roomID}</div>
//       <div className="videoContainer" ref={root} style={{
//         width:"100%",
//         height:"100vh",
//         overflow:"hidden",
//         overflowY:"auto"
//       }}></div>
//     </>
//   );
// }

// export default memo(JoinMeeting);
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}
export default function JoinMeeting() {
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 511307651;
      const serverSecret = process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        turnOnMicrophoneWhenJoining: true,
                   	turnOnCameraWhenJoining: true,
                   	showMyCameraToggleButton: true,
                   	showMyMicrophoneToggleButton: true,
                   	showAudioVideoSettingsButton: true,
                   	showScreenSharingButton: true,
                   	showTextChat: true,
                   	showUserList: true,
                     layout: "Grid",
                   	showLayoutButton: true,
                     showTurnOffRemoteCameraButton:true,
                     showTurnOffRemoteMicrophoneButton:true,
                     showMyCameraToggleButton: true,
                     showMyMicrophoneToggleButton:true, // Whether to display the button for toggling my microphone. Displayed by default.
                     showAudioVideoSettingsButton: true, // Whether to display the button for audio and video settings. Displayed by default.
                     showTextChat:true, // Whether to display the text chat on the right side. Displayed by default.
                     showUserList: true, // Whether to display the participant list. Displayed by default. 
                     showRemoveUserButton: true,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: [ZegoUIKitPrebuilt.GroupCall], // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  };
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
