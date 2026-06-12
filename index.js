"use strict";var O=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var ut=Object.getOwnPropertyNames;var mt=Object.prototype.hasOwnProperty;var ft=(e,r)=>{for(var l in r)O(e,l,{get:r[l],enumerable:!0})},gt=(e,r,l,c)=>{if(r&&typeof r=="object"||typeof r=="function")for(let d of ut(r))!mt.call(e,d)&&d!==l&&O(e,d,{get:()=>r[d],enumerable:!(c=pt(r,d))||c.enumerable});return e};var bt=e=>gt(O({},"__esModule",{value:!0}),e);var jt={};ft(jt,{activate:()=>Pt});module.exports=bt(jt);var g=class Y{constructor(r,l,c){this.handle=r,this.dataModel=l,this.objectRegistry=c}get parent(){let r=this.dataModel.getObjectCanonicalParent(this.handle);return r?this.objectRegistry.getObjectFromHandle(r,Y):null}},w=(e,r,...l)=>new Promise((c,d)=>{e.withinTransaction(()=>r(...l,c,d))}),f=(e,r,l,c,...d)=>new Promise((m,A)=>{e.withinTransaction(()=>c(...d,y=>m(r.getObjectFromHandle(y,l)),A))}),D=class extends g{static className="Clip";get name(){return this.dataModel.clipGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetName(this.handle,e)})}get startTime(){return this.dataModel.clipGetStartTime(this.handle)}get endTime(){return this.dataModel.clipGetEndTime(this.handle)}get duration(){return this.dataModel.clipGetEndTime(this.handle)-this.dataModel.clipGetStartTime(this.handle)}get startMarker(){return this.dataModel.clipGetStartMarker(this.handle)}get endMarker(){return this.dataModel.clipGetEndMarker(this.handle)}get looping(){return this.dataModel.clipGetLooping(this.handle)}set looping(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetLooping(this.handle,e)})}get loopStart(){return this.dataModel.clipGetLoopStart(this.handle)}get loopEnd(){return this.dataModel.clipGetLoopEnd(this.handle)}get color(){return this.dataModel.clipGetColor(this.handle)}set color(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetColor(this.handle,e)})}get muted(){return this.dataModel.clipGetMuted(this.handle)}set muted(e){this.dataModel.withinTransaction(()=>{this.dataModel.clipSetMuted(this.handle,e)})}},R=class extends D{static className="AudioClip";get filePath(){return this.dataModel.audioclipGetFilePath(this.handle)}get warping(){return this.dataModel.audioclipGetWarping(this.handle)}set warping(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarping(this.handle,e)})}get warpMode(){return this.dataModel.audioclipGetWarpMode(this.handle)}set warpMode(e){this.dataModel.withinTransaction(()=>{this.dataModel.audioclipSetWarpMode(this.handle,e)})}get warpMarkers(){return this.dataModel.audioclipGetWarpMarkers(this.handle)}},I=class extends D{static className="MidiClip";get notes(){return this.dataModel.midiclipGetNotes(this.handle)}set notes(e){this.dataModel.withinTransaction(()=>{this.dataModel.midiclipSetNotes(this.handle,e)})}},J=class extends g{static className="ClipSlot";get clip(){let e=this.dataModel.clipslotGetClip(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,D):null}deleteClip(){return w(this.dataModel,this.dataModel.clipslotDeleteClip,this.handle)}createMidiClip(e){return f(this.dataModel,this.objectRegistry,I,this.dataModel.clipslotCreateMidiClip,this.handle,e)}createAudioClip(e){return f(this.dataModel,this.objectRegistry,R,this.dataModel.clipslotCreateAudioClip,this.handle,{filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings})}},M=class extends g{static className="DeviceParameter";get name(){return this.dataModel.deviceParameterGetName(this.handle)}get min(){return this.dataModel.deviceParameterGetInternalMin(this.handle)}get max(){return this.dataModel.deviceParameterGetInternalMax(this.handle)}get isQuantized(){return this.dataModel.deviceParameterGetIsQuantized(this.handle)}get defaultValue(){return this.dataModel.deviceParameterGetDefaultValue(this.handle)}get valueItems(){return this.dataModel.deviceParameterGetValueItems(this.handle)}getValue(){return new Promise(e=>{this.dataModel.deviceParameterGetInternalValue(this.handle,e)})}setValue(e){return new Promise((r,l)=>{this.dataModel.withinTransaction(()=>{this.dataModel.deviceParameterSetInternalValue(this.handle,e,r,c=>l(new Error(c)))})})}},v=class extends g{static className="Device";get name(){return this.dataModel.deviceGetName(this.handle)}get parameters(){return this.dataModel.deviceGetParameters(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,M))}},U=class extends g{static className="TakeLane";get clips(){return this.dataModel.takelaneGetClips(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,D))}get name(){return this.dataModel.takelaneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.takelaneSetName(this.handle,e)})}createMidiClip(e,r){return f(this.dataModel,this.objectRegistry,I,this.dataModel.takelaneCreateMidiClip,this.handle,e,r)}createAudioClip(e){return f(this.dataModel,this.objectRegistry,R,this.dataModel.takelaneCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},Z=class extends g{static className="MixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetVolume(this.handle),M)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.mixerdeviceGetPanning(this.handle),M)}get sends(){return this.dataModel.mixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,M))}},T=class _ extends g{static className="Track";get name(){return this.dataModel.trackGetName(this.handle)}set name(r){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetName(this.handle,r)})}get mute(){return this.dataModel.trackGetMute(this.handle)}set mute(r){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetMute(this.handle,r)})}get solo(){return this.dataModel.trackGetSolo(this.handle)}set solo(r){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetSolo(this.handle,r)})}get mutedViaSolo(){return this.dataModel.trackGetMutedViaSolo(this.handle)}get arm(){return this.dataModel.trackGetArm(this.handle)}set arm(r){this.dataModel.withinTransaction(()=>{this.dataModel.trackSetArm(this.handle,r)})}get clipSlots(){return this.dataModel.trackGetClipSlots(this.handle).map(r=>this.objectRegistry.getObjectFromHandle(r,J))}get takeLanes(){return this.dataModel.trackGetTakeLanes(this.handle).map(r=>this.objectRegistry.getObjectFromHandle(r,U))}get arrangementClips(){return this.dataModel.trackGetArrangementClips(this.handle).map(r=>this.objectRegistry.getObjectFromHandle(r,D))}get groupTrack(){let r=this.dataModel.trackGetGroupTrack(this.handle);return r?this.objectRegistry.getObjectFromHandle(r,_):null}get devices(){return this.dataModel.trackGetDevices(this.handle).map(r=>this.objectRegistry.getObjectFromHandle(r,v))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.trackGetMixerDevice(this.handle),Z)}createTakeLane(){return f(this.dataModel,this.objectRegistry,U,this.dataModel.trackCreateTakeLane,this.handle)}insertDevice(r,l){return f(this.dataModel,this.objectRegistry,v,this.dataModel.trackInsertDevice,this.handle,r,BigInt(l))}deleteDevice(r){return w(this.dataModel,this.dataModel.trackDeleteDevice,this.handle,r.handle)}duplicateDevice(r){return f(this.dataModel,this.objectRegistry,v,this.dataModel.trackDuplicateDevice,this.handle,r.handle)}deleteClip(r){return w(this.dataModel,this.dataModel.trackDeleteClip,this.handle,r.handle)}clearClipsInRange(r,l){return w(this.dataModel,this.dataModel.trackClearClipsInRange,this.handle,r,l)}},$=class extends T{static className="AudioTrack";createAudioClip(e){return f(this.dataModel,this.objectRegistry,R,this.dataModel.trackCreateAudioClip,this.handle,{duration:e.duration,filePath:e.filePath,isWarped:e.isWarped,loopSettings:e.loopSettings,startTime:e.startTime})}},Q=class extends g{static className="CuePoint";get time(){return this.dataModel.cuePointGetTime(this.handle)}get name(){return this.dataModel.cuePointGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.cuePointSetName(this.handle,e)})}},tt=class extends T{static className="MidiTrack";createMidiClip(e,r){return f(this.dataModel,this.objectRegistry,I,this.dataModel.trackCreateMidiClip,this.handle,e,r)}},j=class extends g{static className="Scene";get name(){return this.dataModel.sceneGetName(this.handle)}set name(e){this.dataModel.withinTransaction(()=>{this.dataModel.sceneSetName(this.handle,e)})}get tempo(){return this.dataModel.sceneGetTempo(this.handle)}get signatureNumerator(){return this.dataModel.sceneGetSignatureNumerator(this.handle)}get signatureDenominator(){return this.dataModel.sceneGetSignatureDenominator(this.handle)}},et=class extends g{static className="Song";get tracks(){return this.dataModel.songGetTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,T))}get returnTracks(){return this.dataModel.songGetReturnTracks(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,T))}get mainTrack(){return this.objectRegistry.getObjectFromHandle(this.dataModel.songGetMainTrack(this.handle),T)}get scenes(){return this.dataModel.songGetScenes(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,j))}get cuePoints(){return this.dataModel.songGetCuePoints(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,Q))}get tempo(){return this.dataModel.songGetTempo(this.handle)}set tempo(e){this.dataModel.withinTransaction(()=>{this.dataModel.songSetTempo(this.handle,e)})}get gridQuantization(){return this.dataModel.songGetGridQuantization(this.handle)}get gridIsTriplet(){return this.dataModel.songGetGridIsTriplet(this.handle)}get rootNote(){return Number(this.dataModel.songGetRootNote(this.handle))}get scaleName(){return this.dataModel.songGetScaleName(this.handle)}get scaleMode(){return this.dataModel.songGetScaleMode(this.handle)}get scaleIntervals(){return this.dataModel.songGetScaleIntervals(this.handle).map(Number)}createAudioTrack(){return f(this.dataModel,this.objectRegistry,$,this.dataModel.songCreateAudioTrack,this.handle)}createMidiTrack(){return f(this.dataModel,this.objectRegistry,tt,this.dataModel.songCreateMidiTrack,this.handle)}createScene(e){return f(this.dataModel,this.objectRegistry,j,this.dataModel.songCreateScene,this.handle,BigInt(e))}deleteTrack(e){return w(this.dataModel,this.dataModel.songDeleteTrack,this.handle,e.handle)}deleteScene(e){return w(this.dataModel,this.dataModel.songDeleteScene,this.handle,e.handle)}duplicateTrack(e){return f(this.dataModel,this.objectRegistry,T,this.dataModel.songDuplicateTrack,this.handle,e.handle)}duplicateScene(e){return f(this.dataModel,this.objectRegistry,j,this.dataModel.songDuplicateScene,this.handle,e.handle)}createCuePoint(e){return f(this.dataModel,this.objectRegistry,Q,this.dataModel.songCreateCuePoint,this.handle,e)}deleteCuePoint(e){return w(this.dataModel,this.dataModel.songDeleteCuePoint,this.handle,e.handle)}},it=class extends g{static className="Application";get song(){return this.objectRegistry.getObjectFromHandle(this.dataModel.rootGetSong(this.handle),et)}},At=class{module;constructor(e){this.module=e}registerCommand(e,r){this.module.registerCommand(e,r)}executeCommand(e,...r){this.module.executeCommand(e,...r)}},rt=class extends g{static className="ChainMixerDevice";get volume(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetVolume(this.handle),M)}get panning(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainmixerdeviceGetPanning(this.handle),M)}get sends(){return this.dataModel.chainmixerdeviceGetSends(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,M))}},S=class extends g{static className="Chain";get devices(){return this.dataModel.chainGetDevices(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,v))}get mixer(){return this.objectRegistry.getObjectFromHandle(this.dataModel.chainGetMixerDevice(this.handle),rt)}insertDevice(e,r){return f(this.dataModel,this.objectRegistry,v,this.dataModel.chainInsertDevice,this.handle,e,BigInt(r))}deleteDevice(e){return w(this.dataModel,this.dataModel.chainDeleteDevice,this.handle,e.handle)}duplicateDevice(e){return f(this.dataModel,this.objectRegistry,v,this.dataModel.chainDuplicateDevice,this.handle,e.handle)}},ot=class extends S{static className="DrumChain";get receivingNote(){return Number(this.dataModel.drumchainGetReceivingNote(this.handle))}set receivingNote(e){this.dataModel.withinTransaction(()=>{this.dataModel.drumchainSetReceivingNote(this.handle,BigInt(e))})}},at=class extends v{static className="RackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,S))}insertChain(e){return f(this.dataModel,this.objectRegistry,S,this.dataModel.rackdeviceInsertChain,this.handle,BigInt(e))}},yt=class extends at{static className="DrumRackDevice";get chains(){return this.dataModel.rackdeviceGetChains(this.handle).map(e=>this.objectRegistry.getObjectFromHandle(e,ot))}},X=class extends g{static className="Sample";get filePath(){return this.dataModel.sampleGetFilePath(this.handle)}},xt=class extends v{static className="Simpler";get sample(){let e=this.dataModel.simplerGetSample(this.handle);return e?this.objectRegistry.getObjectFromHandle(e,X):null}replaceSample(e){return f(this.dataModel,this.objectRegistry,X,this.dataModel.simplerReplaceSample,this.handle,e)}},vt=[it,et,$,tt,T,R,I,D,J,U,xt,yt,at,v,X,ot,S,j,Q,M,Z,rt],wt=class{cache=new Map;dataModel;constructor(e){this.dataModel=e}getOrCreateObjectFromHandle(e){let r=this.cache.get(e.id);if(r)return r;let l=vt.find(d=>this.dataModel.getObjectIsOfClass(e,d.className));if(!l)throw new Error("Unknown object type");let c=new l(e,this.dataModel,this);return this.cache.set(e.id,c),c}getObjectFromHandle(e,r){let l=this.getOrCreateObjectFromHandle(e);if(!(l instanceof r))throw new Error("Object of incorrect type");return l}},Mt=class{module;constructor(e){this.module=e}get storageDirectory(){return this.module.storageDirectory}get tempDirectory(){return this.module.tempDirectory}get language(){return this.module.language}},Ct=class{module;constructor(e){this.module=e}renderPreFxAudio(e,r,l){return new Promise((c,d)=>{this.module.renderPreFxAudio(e.handle,{endTime:l,startTime:r},c,d)})}importIntoProject(e){return new Promise((r,l)=>{this.module.importIntoProject(e,r,l)})}},W=(e,r)=>typeof r=="number"?{progress:r,text:e}:{text:e},Tt=class{module;constructor(e){this.module=e}registerContextMenuAction(e,r,l){return new Promise(c=>{this.module.registerContextMenuAction(e,r,l,d=>{c(()=>new Promise(m=>{d(m)}))})})}showModalDialog(e,r,l){return new Promise((c,d)=>{this.module.showModalDialog(e,r,l,c,d)})}withinProgressDialog(e,r,l){let c=new AbortController;return new Promise((d,m)=>{this.module.showProgressDialog(W(e,r.progress),({update:A,close:y})=>{let F=(E,H)=>new Promise(G=>{A(W(E,H),G)}),C=()=>new Promise(E=>{y(E)});l(F,c.signal).finally(C).then(d).catch(m)},()=>{c.abort()})})}},st=(e,r)=>{let{commands:l,dataModel:c,environment:d,resources:m,ui:A}=e.initializeExtensionHost({apiVersion:r}),y=new wt(c);return{application:y.getObjectFromHandle(c.getRoot(),it),commands:new At(l),environment:new Mt(d),getObjectFromHandle:y.getObjectFromHandle.bind(y),resources:new Ct(m),ui:new Tt(A),withinTransaction:c.withinTransaction.bind(c)}};var lt=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skeleton Key</title>
  <script>
    function doSendMessage(msg) {
      if (window.webkit?.messageHandlers?.live) window.webkit.messageHandlers.live.postMessage(msg);
      else if (window.chrome?.webview) window.chrome.webview.postMessage(msg);
    }
    function closeWithResult(result) {
      doSendMessage({ method: "close_and_send", params: [JSON.stringify(result)] });
    }
    function injectFoundation() {
      const bpm = parseInt(document.getElementById("bpm-input").value, 10) || BLUEPRINTS[document.getElementById("genre-select").value].bpm;
      const tracks = {
        drums: document.getElementById("checkbox-drums").checked,
        bass: document.getElementById("checkbox-bass").checked,
        melody: document.getElementById("checkbox-melody").checked,
        effects: document.getElementById("checkbox-effects").checked
      };
      closeWithResult({ action: "inject", genre: document.getElementById("genre-select").value, bpm, tracks });
    }
    function cancelDialog() {
      closeWithResult({ action: "cancel" });
    }

    const BLUEPRINTS = {
      house:       { bpm: 126, key: "A Minor",  feel: "Four-to-the-floor groove"  },
      dubstep:     { bpm: 140, key: "F Minor",  feel: "Half-time heavy weight"    },
      hiphop_trap: { bpm: 145, key: "D\\u266f Minor", feel: "Sparse 808 cadence"  },
      dnb:         { bpm: 172, key: "F Minor",  feel: "Amen-driven momentum"      },
      techno:      { bpm: 133, key: "F Minor",  feel: "Hypnotic 4/4 industrial"   },
      afrobeats:   { bpm: 106, key: "G Minor",  feel: "Syncopated Afro groove"    },
      reggaeton:   { bpm:  97, key: "D Minor",  feel: "Dembow kick-snare pattern" },
      uk_garage:   { bpm: 130, key: "A Minor",  feel: "2-step swing rhythm"       },
    };

    function updatePreview() {
      const bp = BLUEPRINTS[document.getElementById("genre-select").value];
      document.getElementById("bpm-input").value          = bp.bpm;
      document.getElementById("preview-key").textContent  = bp.key;
      document.getElementById("preview-feel").textContent = bp.feel;
    }

    document.addEventListener("DOMContentLoaded", () => {
      updatePreview();
      document.getElementById("genre-select").addEventListener("change", updatePreview);
      document.getElementById("genre-select").focus();
      document.addEventListener("keydown", e => {
        if (e.key === "Enter")  injectFoundation();
        if (e.key === "Escape") cancelDialog();
      });
    });
  </script>
</head>
<body>
  <div class="panel-container">

    <!-- X close button -->
    <button class="close-x" onclick="cancelDialog()" title="Close">&times;</button>

    <!-- Digital Skull + Key Icon -->
    <div class="key-icon" aria-hidden="true">
      <svg viewBox="0 0 72 148" xmlns="http://www.w3.org/2000/svg">

        <!-- ======= PIXEL SKULL ======= -->
        <!-- Row 0: cols 2-9 -->
        <rect x="12" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="18" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="24" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="30" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="36" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="42" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="48" y="0"  width="5" height="5" fill="currentColor"/>
        <rect x="54" y="0"  width="5" height="5" fill="currentColor"/>
        <!-- Row 1: cols 1-10 -->
        <rect x="6"  y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="12" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="18" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="24" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="30" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="36" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="42" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="48" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="54" y="6"  width="5" height="5" fill="currentColor"/>
        <rect x="60" y="6"  width="5" height="5" fill="currentColor"/>
        <!-- Row 2: cols 0-11 (full width) -->
        <rect x="0"  y="12" width="5" height="5" fill="currentColor"/>
        <rect x="6"  y="12" width="5" height="5" fill="currentColor"/>
        <rect x="12" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="24" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="42" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="54" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="12" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="12" width="5" height="5" fill="currentColor"/>
        <!-- Row 3: cols 0-11, minus 2,3,8,9 = angry brow cutout -->
        <rect x="0"  y="18" width="5" height="5" fill="currentColor"/>
        <rect x="6"  y="18" width="5" height="5" fill="currentColor"/>
        <rect x="24" y="18" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="18" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="18" width="5" height="5" fill="currentColor"/>
        <rect x="42" y="18" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="18" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="18" width="5" height="5" fill="currentColor"/>
        <!-- Row 4: eye sockets \u2014 cols 0,4,5,6,7,11 -->
        <rect x="0"  y="24" width="5" height="5" fill="currentColor"/>
        <rect x="24" y="24" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="24" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="24" width="5" height="5" fill="currentColor"/>
        <rect x="42" y="24" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="24" width="5" height="5" fill="currentColor"/>
        <!-- Row 5: eyes deeper \u2014 cols 0, 5, 11 -->
        <rect x="0"  y="30" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="30" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="30" width="5" height="5" fill="currentColor"/>
        <!-- Row 6: nose cavity \u2014 cols 0-3 and 8-11 -->
        <rect x="0"  y="36" width="5" height="5" fill="currentColor"/>
        <rect x="6"  y="36" width="5" height="5" fill="currentColor"/>
        <rect x="12" y="36" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="36" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="36" width="5" height="5" fill="currentColor"/>
        <rect x="54" y="36" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="36" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="36" width="5" height="5" fill="currentColor"/>
        <!-- Row 7: full jaw top -->
        <rect x="0"  y="42" width="5" height="5" fill="currentColor"/>
        <rect x="6"  y="42" width="5" height="5" fill="currentColor"/>
        <rect x="12" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="24" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="42" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="54" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="42" width="5" height="5" fill="currentColor"/>
        <rect x="66" y="42" width="5" height="5" fill="currentColor"/>
        <!-- Row 8: jaw \u2014 cols 1-10 -->
        <rect x="6"  y="48" width="5" height="5" fill="currentColor"/>
        <rect x="12" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="24" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="42" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="54" y="48" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="48" width="5" height="5" fill="currentColor"/>
        <!-- Row 9: teeth \u2014 cols 1,3,5,6,8,10 -->
        <rect x="6"  y="54" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="54" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="54" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="54" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="54" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="54" width="5" height="5" fill="currentColor"/>
        <!-- Row 10: teeth bottom \u2014 cols 1,3,5,6,8,10 -->
        <rect x="6"  y="60" width="5" height="5" fill="currentColor"/>
        <rect x="18" y="60" width="5" height="5" fill="currentColor"/>
        <rect x="30" y="60" width="5" height="5" fill="currentColor"/>
        <rect x="36" y="60" width="5" height="5" fill="currentColor"/>
        <rect x="48" y="60" width="5" height="5" fill="currentColor"/>
        <rect x="60" y="60" width="5" height="5" fill="currentColor"/>

        <!-- Glitch stray pixels \u2014 digital noise -->
        <rect x="66" y="3"  width="3" height="3" fill="currentColor" opacity="0.5"/>
        <rect x="0"  y="57" width="3" height="3" fill="currentColor" opacity="0.4"/>
        <rect x="69" y="48" width="2" height="2" fill="currentColor" opacity="0.35"/>

        <!-- ======= KEY ======= -->

        <!-- Guard \u2014 full width bar -->
        <rect x="4"  y="70" width="64" height="5" fill="currentColor"/>
        <!-- Guard detail notches (cut into guard for ornate look) -->
        <rect x="10" y="70" width="4"  height="3" fill="var(--bg-card)"/>
        <rect x="58" y="70" width="4"  height="3" fill="var(--bg-card)"/>

        <!-- Shaft -->
        <rect x="31" y="75" width="10" height="65" fill="currentColor"/>

        <!-- Right-side bit \u2014 5 teeth, uneven lengths -->
        <rect x="41" y="83"  width="21" height="6" fill="currentColor"/>
        <rect x="41" y="95"  width="14" height="5" fill="currentColor"/>
        <rect x="41" y="106" width="22" height="6" fill="currentColor"/>
        <rect x="41" y="118" width="16" height="5" fill="currentColor"/>
        <rect x="41" y="129" width="9"  height="5" fill="currentColor"/>

        <!-- Left notch (opposite side detail) -->
        <rect x="19" y="100" width="12" height="5" fill="currentColor"/>

      </svg>
    </div>

    <!-- Header -->
    <div class="header-section">
      <h1 class="title">SKELETON KEY</h1>
      <p class="tagline">&gt; UNLOCK YOUR PRODUCTION_</p>
    </div>

    <!-- Blueprint selector -->
    <div class="form-group">
      <label class="form-label" for="genre-select">&gt; SELECT BLUEPRINT</label>
      <div class="select-wrapper">
        <select id="genre-select">
          <option value="house">House</option>
          <option value="dubstep">Dubstep</option>
          <option value="hiphop_trap">Hip-Hop / Trap</option>
          <option value="dnb">Drum &amp; Bass</option>
          <option value="techno">Techno</option>
          <option value="afrobeats">Afrobeats</option>
          <option value="reggaeton">Reggaeton</option>
          <option value="uk_garage">UK Garage</option>
        </select>
        <span class="select-arrow" aria-hidden="true">&#9660;</span>
      </div>
    </div>

    <!-- Blueprint preview -->
    <div class="blueprint-box">
      <div class="blueprint-stats">
        <div class="stat">
          <span class="stat-label">TEMPO</span>
          <div class="bpm-wrap">
            <input type="number" id="bpm-input" class="bpm-input" min="60" max="220" value="126" />
            <span class="bpm-unit">BPM</span>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-label">ROOT KEY</span>
          <span class="stat-value" id="preview-key">A Minor</span>
        </div>
      </div>
      <p class="preview-feel" id="preview-feel">Four-to-the-floor groove</p>

      <div class="layers">
        <label class="layer"><input type="checkbox" id="checkbox-drums" checked /> <span class="layer-dot drums"></span><span class="layer-name">Drums</span></label>
        <label class="layer"><input type="checkbox" id="checkbox-bass" checked /> <span class="layer-dot bass"></span><span class="layer-name">Bass</span></label>
        <label class="layer"><input type="checkbox" id="checkbox-melody" checked /> <span class="layer-dot melody"></span><span class="layer-name">Melody</span></label>
        <label class="layer"><input type="checkbox" id="checkbox-effects" checked /> <span class="layer-dot effects"></span><span class="layer-name">Effects</span></label>
      </div>

      <div class="sections">
        <span class="section-tag">INTRO</span>
        <span class="section-arrow">&#10095;</span>
        <span class="section-tag">BUILD</span>
        <span class="section-arrow">&#10095;</span>
        <span class="section-tag">DROP</span>
        <span class="section-arrow">&#10095;</span>
        <span class="section-tag">BREAK</span>
        <span class="section-arrow">&#10095;</span>
        <span class="section-tag">DROP 2</span>
        <span class="section-arrow">&#10095;</span>
        <span class="section-tag">OUTRO</span>
      </div>
    </div>

    <!-- CTA -->
    <button class="inject-button" onclick="injectFoundation()">&gt; BUILD THE SKELETON</button>
    <button class="close-btn" onclick="cancelDialog()">cancel</button>

    <!-- Rooks logo footer -->
    <div class="footer-brand">
      <img src="data:image/jpeg;base64,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" class="rooks-logo" alt="Rooks Music"/>
    </div>

  </div>
</body>
</html>`;var nt=`:root {
  --bg-main:     #000000;
  --bg-card:     #050505;
  --bg-input:    #020202;
  --bg-box:      #000000;
  --accent:      #00ff41;
  --accent-dim:  #00bb30;
  --accent-glow: rgba(0, 255, 65, 0.22);
  --text-hi:     #ccffdd;
  --text-mid:    #3a9947;
  --text-dim:    #133318;
  --border:      #071009;
  --border-lit:  #0d2211;
  --drums:       #FF7A3D;
  --bass:        #FFB03B;
  --melody:      #00D9FF;
  --effects:     #A85FFF;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg-main);
  color: var(--text-hi);
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  height: 100vh;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* \u2500\u2500 Panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.panel-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg-card);
  border: none;
  border-radius: 0;
  padding: 12px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 0 rgba(0,255,65,0.06);
  resize: both;
  overflow: auto;
}

/* subtle corner-tick CRT feel */
.panel-container::before,
.panel-container::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: var(--accent-dim);
  border-style: solid;
}
.panel-container::before { top: -1px; left: -1px;  border-width: 2px 0 0 2px; }
.panel-container::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

/* \u2500\u2500 X Close Button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.close-x {
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-mid);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 4px;
  font-family: monospace;
  transition: color 0.15s;
  z-index: 10;
}
.close-x:hover { color: var(--accent); }

/* \u2500\u2500 Skull / Key Icon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.key-icon {
  position: relative;
  display: flex;
  justify-content: center;
  color: var(--accent);
  filter:
    drop-shadow(0 0 3px #00ff41)
    drop-shadow(0 0 8px rgba(0,255,65,0.6))
    drop-shadow(0 0 18px rgba(0,255,65,0.25));
  margin-bottom: -4px;
}
/* CRT scanline overlay on the skull */
.key-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 1px,
    rgba(0,0,0,0.28) 1px, rgba(0,0,0,0.28) 2px
  );
  pointer-events: none;
}

.key-icon svg {
  width: 40px;
  height: auto;
  image-rendering: pixelated;
}

/* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.header-section {
  text-align: center;
  border-bottom: 1px solid var(--border-lit);
  padding-bottom: 8px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent-glow);
  text-transform: uppercase;
}

.tagline {
  margin-top: 3px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 3px;
  color: var(--text-mid);
  text-transform: uppercase;
}

/* \u2500\u2500 Genre Selector \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: var(--text-mid);
  text-transform: uppercase;
}

.select-wrapper { position: relative; }

select {
  width: 100%;
  background: var(--bg-input);
  color: var(--accent);
  border: 1px solid var(--border-lit);
  border-radius: 2px;
  padding: 9px 28px 9px 10px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: 700;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  letter-spacing: 1px;
}
select:focus {
  border-color: var(--accent-dim);
  box-shadow: 0 0 6px rgba(0,255,65,0.18);
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-dim);
  pointer-events: none;
  font-size: 10px;
}

/* \u2500\u2500 Blueprint Box \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.blueprint-box {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: var(--bg-box);
  border: 1px solid var(--border-lit);
  border-radius: 2px;
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.blueprint-stats { display: flex; align-items: center; gap: 10px; }

.stat { flex: 1; display: flex; flex-direction: column; gap: 2px; }

.stat-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-dim);
  text-transform: uppercase;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.5px;
  text-shadow: 0 0 6px var(--accent-glow);
}

.stat-divider { width: 1px; height: 26px; background: var(--border-lit); flex-shrink: 0; }

.preview-feel {
  font-size: 11px;
  color: var(--text-mid);
  letter-spacing: 0.5px;
  border-top: 1px solid var(--border);
  padding-top: 7px;
  font-style: italic;
}

/* \u2500\u2500 Track Layers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.layers {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--border);
  padding-top: 7px;
}

.layer { display: flex; align-items: center; gap: 7px; cursor: pointer; }

input[type="checkbox"] {
  accent-color: var(--accent);
  cursor: pointer;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.layer-dot { width: 6px; height: 6px; border-radius: 1px; flex-shrink: 0; }
.layer-dot.drums  { background: var(--drums);   box-shadow: 0 0 4px var(--drums); }
.layer-dot.bass   { background: var(--bass);    box-shadow: 0 0 4px var(--bass); }
.layer-dot.melody { background: var(--melody);  box-shadow: 0 0 4px var(--melody); }
.layer-dot.effects { background: var(--effects); box-shadow: 0 0 4px var(--effects); }

.layer-name {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-hi);
  min-width: 52px;
  text-transform: uppercase;
}

.layer-desc { font-size: 12px; color: var(--text-hi); opacity: 0.6; }

/* \u2500\u2500 Section Markers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.sections {
  display: flex;
  align-items: center;
  gap: 3px;
  border-top: 1px solid var(--border);
  padding-top: 7px;
  flex-wrap: wrap;
}

.section-tag {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-dim);
  border: 1px solid var(--border-lit);
  border-radius: 1px;
  padding: 2px 4px;
  text-transform: uppercase;
}

.section-arrow { font-size: 11px; color: var(--text-dim); line-height: 1; }

/* \u2500\u2500 BPM Input \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.bpm-wrap {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.bpm-input {
  width: 52px;
  background: var(--bg-input);
  color: var(--accent);
  border: 1px solid var(--border-lit);
  border-radius: 2px;
  padding: 2px 4px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: right;
  outline: none;
  -moz-appearance: textfield;
}
.bpm-input::-webkit-outer-spin-button,
.bpm-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.bpm-input:focus {
  border-color: var(--accent-dim);
  box-shadow: 0 0 6px rgba(0,255,65,0.18);
}

.bpm-unit {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-mid);
  letter-spacing: 1px;
}

/* \u2500\u2500 Build Button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.inject-button {
  width: 100%;
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent-dim);
  border-radius: 2px;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
}
.inject-button:hover {
  background: var(--accent);
  color: #000;
  box-shadow: 0 0 14px var(--accent-glow), 0 0 28px rgba(0,255,65,0.1);
}
.inject-button:active { opacity: 0.85; }

/* \u2500\u2500 Cancel (text link) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.close-btn {
  background: none;
  border: none;
  color: var(--text-dim);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: center;
  padding: 2px;
  transition: color 0.15s;
}
.close-btn:hover { color: var(--text-mid); }

/* \u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.footer-brand {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--border-lit);
  padding-top: 7px;
  flex-shrink: 0;
}

.rooks-logo {
  width: 80px;
  height: auto;
  /* invert white bg \u2192 black, black letters \u2192 white, then tint neon green */
  filter: invert(1) sepia(1) saturate(4) hue-rotate(90deg) brightness(0.8);
  opacity: 0.55;
  transition: opacity 0.2s, filter 0.2s;
}
.rooks-logo:hover {
  opacity: 0.9;
  filter: invert(1) sepia(1) saturate(6) hue-rotate(90deg) brightness(1);
}

.footer-text {
  text-align: center;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-top: 5px;
}
`;console.log("Skeleton Key extension activated");var N={DRUMS:16734525,BASS:16754747,MELODY:891391,EFFECTS:11030783},Et=["MidiClip","AudioClip","MidiTrack","AudioTrack","ClipSlot","Scene","MidiTrack.ArrangementSelection","AudioTrack.ArrangementSelection","ClipSlotSelection"];function Pt(e){console.log("Skeleton Key: activate() called");let r=st(e,"1.0.0");console.log("Skeleton Key: context initialized"),r.commands.registerCommand("skeleton-key.open",()=>(async()=>{console.log("Skeleton Key: command triggered, opening dialog");try{let l=lt.replace("</head>",`<style>${nt}</style></head>`),c=`data:text/html,${encodeURIComponent(l)}`,d=await r.ui.showModalDialog(c,390,580);if(!d)return;let m=JSON.parse(d);if(m&&m.action==="inject"&&m.genre){let A=m.bpm?Number(m.bpm):void 0,y=m.tracks||{drums:!0,bass:!0,melody:!0,effects:!0};await Bt(r,m.genre,A,y)}}catch(l){console.error("[Skeleton Key] Dialog failed:",l)}})());for(let l of Et)r.ui.registerContextMenuAction(l,"Skeleton Key...","skeleton-key.open"),console.log(`Skeleton Key: registered context menu on ${l}`);console.log("Skeleton Key: fully activated")}var ct=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];function K(e,r){return r===0?e:e.map(l=>({...l,pitch:l.pitch<40?l.pitch:Math.max(0,Math.min(127,l.pitch+r))}))}async function Bt(e,r,l,c){console.log(`[Skeleton Key] Injecting blueprint for genre: ${r}`);let d=e.application.song,m=d.rootNote??0,A=d.scaleMode??!1;console.log(`[Skeleton Key] Project key: ${ct[m]}, Scale Mode: ${A}`);let F={house:9,dubstep:5,hiphop_trap:3,dnb:5,techno:5,afrobeats:7,reggaeton:2,uk_garage:9}[r]??0,C=A?(m-F+12)%12:0;C!==0&&console.log(`[Skeleton Key] Transposing +${C} semitones to match project key ${ct[m]}`);let E={house:126,dubstep:140,hiphop_trap:145,dnb:172,techno:133,afrobeats:106,reggaeton:97,uk_garage:130};d.tempo=l??E[r]??126;let H=[{beat:0,name:"Intro"},{beat:64,name:"Build"},{beat:128,name:"Drop"},{beat:192,name:"Break"},{beat:256,name:"Drop 2"},{beat:320,name:"Outro"}];for(let h of H)try{let t=await d.createCuePoint(h.beat);t.name=h.name}catch(t){console.warn(`[Skeleton Key] Failed to create locator at beat ${h.beat}:`,t)}let G=await e.withinTransaction(()=>Promise.all([d.createMidiTrack(),d.createMidiTrack(),d.createMidiTrack(),d.createMidiTrack()])),[L,V,z,q]=G;L.name="Drums",V.name="Bass",z.name="Melody",q.name="Effects";let o=16,a={drums:[],bass:[],melody:[],fx:[]},p={drums:[],bass:[],melody:[],fx:[]},n={drums:[],bass:[],melody:[],fx:[]};switch(r){case"house":{for(let t=0;t<o*4;t++){let i=t%4===0?115:t%4===2?110:t%4===1?102:95;a.drums.push({pitch:36,startTime:t,duration:.25,velocity:i}),a.bass.push({pitch:33,startTime:t+.5,duration:.4,velocity:100})}let h=[57,60,64,67];for(let t=0;t<o;t++)for(let i of[1.5,3.5])for(let s of h)a.melody.push({pitch:s,startTime:t*4+i,duration:.4,velocity:90});for(let t of[45,52,57,64])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});for(let t=0;t<o*4;t++){let i=t%4===0?110:t%4===2?90:0;i&&p.drums.push({pitch:36,startTime:t,duration:.25,velocity:i})}for(let t=0;t<o;t+=4)p.bass.push({pitch:33,startTime:t*4,duration:14,velocity:80});for(let t of[45,57])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:45});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+2,duration:.25,velocity:105}),t%2===0&&n.drums.push({pitch:38,startTime:t*4+3.5,duration:.25,velocity:80});for(let t=0;t<o;t+=2)n.bass.push({pitch:33,startTime:t*4,duration:7.5,velocity:85});for(let t=0;t<o;t+=4)for(let i of h)n.melody.push({pitch:i,startTime:t*4+1.5,duration:1.5,velocity:72});for(let t of[45,52,57,64])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:55});break}case"dubstep":{for(let t=0;t<o;t++){let i=t*4;a.drums.push({pitch:36,startTime:i,duration:.25,velocity:110}),a.drums.push({pitch:38,startTime:i+2,duration:.25,velocity:120}),t%2===1&&a.drums.push({pitch:36,startTime:i+1.5,duration:.25,velocity:100})}for(let t=0;t<o;t+=2)a.bass.push({pitch:29,startTime:t*4,duration:6,velocity:105});let h=[53,56,60];for(let t=0;t<o;t++)if(t%2===0)for(let i of h)a.melody.push({pitch:i,startTime:t*4+2.5,duration:.5,velocity:85});for(let t of[41,53,56,60])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:48});for(let t=0;t<o;t++)p.drums.push({pitch:36,startTime:t*4,duration:.25,velocity:100});for(let t=0;t<o;t+=4)p.bass.push({pitch:29,startTime:t*4,duration:14,velocity:85});for(let t of[41,53])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:42});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+2,duration:.25,velocity:110});for(let t=0;t<o;t+=4)n.bass.push({pitch:29,startTime:t*4,duration:14,velocity:80});for(let t=0;t<o;t+=4)for(let i of h)n.melody.push({pitch:i,startTime:t*4+2.5,duration:2,velocity:68});for(let t of[41,53,56,60])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});break}case"hiphop_trap":{let h=[[51,58,63],[49,56,61],[47,54,59],[46,53,58]];for(let t=0;t<o;t++){let i=t*4;a.drums.push({pitch:36,startTime:i,duration:.25,velocity:115}),a.drums.push({pitch:36,startTime:i+1.5,duration:.25,velocity:110}),a.drums.push({pitch:38,startTime:i+2,duration:.25,velocity:115}),t%2===1&&(a.drums.push({pitch:36,startTime:i+3.25,duration:.125,velocity:90}),a.drums.push({pitch:36,startTime:i+3.5,duration:.125,velocity:100})),a.bass.push({pitch:27,startTime:i,duration:1.25,velocity:100}),a.bass.push({pitch:27,startTime:i+1.5,duration:1.25,velocity:100}),t%2===1&&a.bass.push({pitch:27,startTime:i+3.5,duration:.4,velocity:90});for(let s of h[t%4])a.melody.push({pitch:s,startTime:t*4,duration:3.5,velocity:85})}for(let t of[39,51,54,58])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:48});for(let t=0;t<o;t++)p.drums.push({pitch:36,startTime:t*4,duration:.25,velocity:108});for(let t=0;t<o;t+=4)p.bass.push({pitch:27,startTime:t*4,duration:14,velocity:90});for(let t of[39,51])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:44});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+2,duration:.25,velocity:108});for(let t=0;t<o;t+=4)n.bass.push({pitch:27,startTime:t*4,duration:14,velocity:78});for(let t=0;t<o;t+=4)for(let i of h[t%4])n.melody.push({pitch:i,startTime:t*4,duration:7.5,velocity:65});for(let t of[39,51,54,58])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});break}case"dnb":{let h=[53,56,60,63,67];for(let t=0;t<o;t++){let i=t*4;a.drums.push({pitch:36,startTime:i,duration:.2,velocity:110}),a.drums.push({pitch:36,startTime:i+1.5,duration:.2,velocity:105}),a.drums.push({pitch:38,startTime:i+1,duration:.2,velocity:115}),a.drums.push({pitch:38,startTime:i+3,duration:.2,velocity:115}),t%2===1&&a.drums.push({pitch:36,startTime:i+2.5,duration:.2,velocity:100})}for(let t=0;t<o;t+=2)a.bass.push({pitch:29,startTime:t*4,duration:7.8,velocity:100});for(let t=0;t<o;t+=2)for(let i of h)a.melody.push({pitch:i,startTime:t*4,duration:7.8,velocity:85});for(let t of[41,53,60,67])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:50});for(let t=0;t<o;t++){let i=t*4;p.drums.push({pitch:36,startTime:i,duration:.2,velocity:105}),p.drums.push({pitch:38,startTime:i+2,duration:.2,velocity:108})}for(let t=0;t<o;t+=4)p.bass.push({pitch:29,startTime:t*4,duration:14,velocity:88});for(let t of[41,53])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:44});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+1,duration:.2,velocity:112}),n.drums.push({pitch:38,startTime:t*4+3,duration:.2,velocity:105});for(let t=0;t<o;t+=4)n.bass.push({pitch:29,startTime:t*4,duration:14,velocity:82});for(let t=0;t<o;t+=4)for(let i of h)n.melody.push({pitch:i,startTime:t*4,duration:14,velocity:70});for(let t of[41,53,60,67])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:54});break}case"techno":{for(let t=0;t<o;t++){let i=t*4;for(let s=0;s<4;s++)a.drums.push({pitch:36,startTime:i+s,duration:.2,velocity:s===0?118:s===2?112:105});for(let s=0;s<4;s++)a.drums.push({pitch:42,startTime:i+s+.5,duration:.1,velocity:78});a.drums.push({pitch:46,startTime:i+1,duration:.4,velocity:88}),a.drums.push({pitch:46,startTime:i+3,duration:.4,velocity:85})}for(let t=0;t<o*4;t++){let i=t%4===0;a.bass.push({pitch:29,startTime:t,duration:.35,velocity:i?108:85}),a.bass.push({pitch:29,startTime:t+.5,duration:.35,velocity:75})}let h=[53,56,60];for(let t=0;t<o;t+=4)for(let i of h)a.melody.push({pitch:i,startTime:t*4+2.5,duration:.3,velocity:80});for(let t of[29,41,53,56])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:46});for(let t=0;t<o;t++)for(let i=0;i<4;i++)p.drums.push({pitch:36,startTime:t*4+i,duration:.2,velocity:108});for(let t=0;t<o;t+=4)p.bass.push({pitch:29,startTime:t*4,duration:14,velocity:85});for(let t of[29,41])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:40});for(let t=0;t<o;t++)for(let i=0;i<4;i++)n.drums.push({pitch:42,startTime:t*4+i,duration:.1,velocity:80}),n.drums.push({pitch:42,startTime:t*4+i+.5,duration:.1,velocity:65});for(let t=0;t<o;t+=4)n.bass.push({pitch:29,startTime:t*4,duration:14,velocity:78});for(let t=0;t<o;t+=4)for(let i of h)n.melody.push({pitch:i,startTime:t*4+2.5,duration:12,velocity:65});for(let t of[29,41,53,56])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});break}case"afrobeats":{for(let s=0;s<o;s++){let u=s*4;a.drums.push({pitch:36,startTime:u,duration:.25,velocity:115}),a.drums.push({pitch:36,startTime:u+2.5,duration:.25,velocity:108}),a.drums.push({pitch:38,startTime:u+1,duration:.25,velocity:112}),a.drums.push({pitch:38,startTime:u+3,duration:.25,velocity:110}),s%2===0&&a.drums.push({pitch:36,startTime:u+3.75,duration:.15,velocity:90})}let h=[[31,34],[34,31],[29,31],[31,29]];for(let s=0;s<o;s++){let[u,x]=h[s%4],b=s*4;a.bass.push({pitch:u,startTime:b,duration:.8,velocity:102}),a.bass.push({pitch:u,startTime:b+1.5,duration:.5,velocity:90}),a.bass.push({pitch:x,startTime:b+2,duration:.8,velocity:98}),a.bass.push({pitch:x,startTime:b+3.5,duration:.35,velocity:85})}let t=[55,58,62],i=[53,57,60];for(let s=0;s<o;s++){let u=s%2===0?t:i,x=s*4;for(let b of u)a.melody.push({pitch:b,startTime:x+.5,duration:.4,velocity:88}),a.melody.push({pitch:b,startTime:x+2.5,duration:.4,velocity:84})}for(let s of[43,55,58,62])a.fx.push({pitch:s,startTime:0,duration:o*4-.5,velocity:50});for(let s=0;s<o;s++)p.drums.push({pitch:36,startTime:s*4,duration:.25,velocity:108});for(let s=0;s<o;s+=2)p.bass.push({pitch:31,startTime:s*4,duration:7.5,velocity:88});for(let s of[43,55])p.fx.push({pitch:s,startTime:0,duration:o*4-.5,velocity:44});for(let s=0;s<o;s++)n.drums.push({pitch:38,startTime:s*4+1,duration:.25,velocity:108}),n.drums.push({pitch:38,startTime:s*4+3,duration:.25,velocity:105});for(let s=0;s<o;s+=2)n.bass.push({pitch:31,startTime:s*4,duration:7.5,velocity:80});for(let s=0;s<o;s+=4)for(let u of t)n.melody.push({pitch:u,startTime:s*4+.5,duration:7,velocity:70});for(let s of[43,55,58,62])n.fx.push({pitch:s,startTime:0,duration:o*4-.5,velocity:54});break}case"reggaeton":{for(let t=0;t<o;t++){let i=t*4;a.drums.push({pitch:36,startTime:i,duration:.25,velocity:118}),a.drums.push({pitch:36,startTime:i+1.5,duration:.25,velocity:110}),a.drums.push({pitch:38,startTime:i+2,duration:.25,velocity:115}),t%2===1&&a.drums.push({pitch:36,startTime:i+3.75,duration:.15,velocity:90})}for(let t=0;t<o;t++){let i=t*4;a.bass.push({pitch:38,startTime:i,duration:1.2,velocity:108}),a.bass.push({pitch:38,startTime:i+1.5,duration:1,velocity:100}),t%2===1&&a.bass.push({pitch:36,startTime:i+2.5,duration:1.2,velocity:95})}let h=[[50,53,57],[48,52,55],[46,50,53],[45,49,52]];for(let t=0;t<o;t++){let i=h[t%4],s=t*4;for(let u of i)a.melody.push({pitch:u,startTime:s+.5,duration:.4,velocity:88}),a.melody.push({pitch:u,startTime:s+2.5,duration:.4,velocity:84})}for(let t of[38,50,53,57])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:48});for(let t=0;t<o;t++)p.drums.push({pitch:36,startTime:t*4,duration:.25,velocity:110});for(let t=0;t<o;t+=4)p.bass.push({pitch:38,startTime:t*4,duration:14,velocity:95});for(let t of[38,50])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:42});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+2,duration:.25,velocity:112});for(let t=0;t<o;t+=4)n.bass.push({pitch:38,startTime:t*4,duration:14,velocity:82});for(let t=0;t<o;t+=4)for(let i of h[0])n.melody.push({pitch:i,startTime:t*4,duration:13.5,velocity:68});for(let t of[38,50,53,57])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});break}case"uk_garage":{for(let t=0;t<o;t++){let i=t*4;a.drums.push({pitch:36,startTime:i,duration:.2,velocity:115}),a.drums.push({pitch:36,startTime:i+2.5,duration:.2,velocity:108}),a.drums.push({pitch:38,startTime:i+1,duration:.2,velocity:112}),a.drums.push({pitch:38,startTime:i+3,duration:.2,velocity:110}),t%2===1&&(a.drums.push({pitch:36,startTime:i+.75,duration:.15,velocity:88}),a.drums.push({pitch:42,startTime:i+1.5,duration:.1,velocity:72}))}for(let t=0;t<o;t++){let i=t*4;a.bass.push({pitch:33,startTime:i,duration:.7,velocity:105}),a.bass.push({pitch:33,startTime:i+.75,duration:.3,velocity:85}),a.bass.push({pitch:40,startTime:i+1.5,duration:.7,velocity:98}),a.bass.push({pitch:33,startTime:i+2.5,duration:.7,velocity:102}),a.bass.push({pitch:40,startTime:i+3.5,duration:.45,velocity:90})}let h=[57,60,64,67];for(let t=0;t<o;t++){let i=t*4;for(let s of h)a.melody.push({pitch:s,startTime:i+.5,duration:.35,velocity:90}),a.melody.push({pitch:s,startTime:i+2.5,duration:.35,velocity:86});if(t%2===1)for(let s of h)a.melody.push({pitch:s,startTime:t*4+3.5,duration:.25,velocity:78})}for(let t of[33,45,57,64])a.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:50});for(let t=0;t<o;t++){let i=t*4;p.drums.push({pitch:36,startTime:i,duration:.2,velocity:108}),p.drums.push({pitch:36,startTime:i+2,duration:.2,velocity:105}),p.drums.push({pitch:38,startTime:i+1,duration:.2,velocity:110}),p.drums.push({pitch:38,startTime:i+3,duration:.2,velocity:108})}for(let t=0;t<o;t+=2)p.bass.push({pitch:33,startTime:t*4,duration:7.5,velocity:90});for(let t of[33,45])p.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:44});for(let t=0;t<o;t++)n.drums.push({pitch:38,startTime:t*4+1,duration:.2,velocity:108}),n.drums.push({pitch:38,startTime:t*4+3,duration:.2,velocity:105});for(let t=0;t<o;t+=2)n.bass.push({pitch:33,startTime:t*4,duration:7.5,velocity:82});for(let t=0;t<o;t+=4)for(let i of h)n.melody.push({pitch:i,startTime:t*4+.5,duration:7,velocity:70});for(let t of[33,45,57,64])n.fx.push({pitch:t,startTime:0,duration:o*4-.5,velocity:52});break}}let dt=p,P=o*4;async function k(h,t,i){let s=[c?.drums!==!1?L.createMidiClip(t,P):null,c?.bass!==!1?V.createMidiClip(t,P):null,c?.melody!==!1?z.createMidiClip(t,P):null,c?.effects!==!1?q.createMidiClip(t,P):null].filter(ht=>ht!==null),[u,x,b,B]=await Promise.all(s);u&&(u.color=N.DRUMS,u.name=h,u.notes=i.drums),x&&(x.color=N.BASS,x.name=h,x.notes=K(i.bass,C)),b&&(b.color=N.MELODY,b.name=h,b.notes=K(i.melody,C)),B&&(B.color=N.EFFECTS,B.name=h,B.notes=K(i.fx,C))}await k("Intro",0,p),await k("Build",64,a),await k("Drop",128,a),await k("Break",192,n),await k("Drop 2",256,a),await k("Outro",320,dt),console.log("[Skeleton Key] Blueprint injection complete.")}0&&(module.exports={activate});
