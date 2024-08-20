

import React, { useEffect, useRef,memo } from 'react';
import config from "../src/lib/config";
import { randomID, getUrlParams, getRandomName } from "../src/lib/util";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JoinMeeting() {
    const {roomID}=useParams();

    console.log(roomID,"kl")
  const root = useRef(null);
  useEffect(() => {
    let isMounted = true;
    const fetchData=async()=>{
      try {
        if (isMounted && root.current) {
          const userID = randomID(5);
          const appID = config.appID;
          let UIKitsConfig = {};
    
          try {
            UIKitsConfig = JSON.parse(
              config.UIKitsConfig.replace(/\n|\t/g, "")
                .replace(/(\w+):/g, '"$1":')
                .replace(/,\s+\}/g, "}")
            );
          } catch (error) {
            console.error('Error parsing UIKitsConfig JSON:', error);
          }
    
        //   const roomID = getUrlParams().get("roomID") || randomID(5);
          const role = getUrlParams().get("role") || "Host";
          const sharedLinks = [];
          if (UIKitsConfig.scenario && UIKitsConfig.scenario.mode) {
            if (UIKitsConfig.scenario.mode === "OneONoneCall") {
              sharedLinks.push({
                name: "Personal link",
                url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
              });
            } else if (UIKitsConfig.scenario.mode === "LiveStreaming") {
              UIKitsConfig.scenario.config.role = role;
              if (role === "Cohost" || role === "Host") {
                sharedLinks.push({
                  name: "Join as co-host",
                  url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Cohost`,
                });
              } else {
                UIKitsConfig = { scenario: UIKitsConfig.scenario };
              }
              sharedLinks.push({
                name: "Join as audience",
                url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Audience`,
              });
            } else if (["VideoConference", "GroupCall"].includes(UIKitsConfig.scenario.mode)) {
              sharedLinks.push({
                name: "Personal link",
                url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
              });
            }
          }
    
          const data={
            userId:userID,appId:config.appID,secret:config.serverSecret,
            effectiveTimeInSeconds: 7200,
            payload:""
          }
    
          const res=await axios.post("http://localhost:8009/api/token",data)
                      const { ZegoUIKitPrebuilt } = await import(
                "@zegocloud/zego-uikit-prebuilt"

              );
              const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, res?.data?.token, roomID, userID, getRandomName());
              const zp = ZegoUIKitPrebuilt.create(kitToken);
              zp.joinRoom({
                container: root.current,
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
                sharedLinks,
                ...UIKitsConfig,
                scenario: {
                  mode: "VideoConference",
                  config: {
                    role: "Host",
                },
              },
              },
            );
              
          
        } 
      } catch (error) {
        
      }
    }
    fetchData();
    return ()=>{
      isMounted=false;
    }
  }, []);

  return (
    <>
      <div>Meeting User One {roomID}</div>
      <div className="videoContainer" ref={root} style={{
        width:"100%",
        height:"100vh",
        overflow:"hidden",
        overflowY:"auto"
      }}></div>
    </>
  );
}

export default memo(JoinMeeting);
