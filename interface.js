function updateInterface(){
 const byId=id=>document.getElementById(id);if(!byId('human-score'))return;
 byId('human-score').textContent=playerScore;byId('cpu-score').textContent=cpuScore;
 let text=currentGameState===GAME_STATE.GAME_OVER?(playerScore===cpuScore?'Draw':playerScore>cpuScore?'You win':'Computer wins'):matchPaused?'Paused':currentGameState===GAME_STATE.PLACING_CUE_BALL?'Place the cue ball in the D':currentPlayer===PLAYER_ID.CPU?'Computer is choosing a shot':currentGameState===GAME_STATE.SHOT_TAKEN?'Balls in motion':`Your turn · target ${currentTargetBallType===TARGET_BALL.ANY_COLOUR_AFTER_RED?'any colour':currentTargetBallType?.toLowerCase()}`;
 if(debugForcePotModeActive)text+=' · practice';byId('match-status').textContent=text;
 byId('shoot').disabled=matchPaused||currentGameState!==GAME_STATE.AIMING||currentPlayer!==PLAYER_ID.HUMAN;
 byId('practice').checked=debugForcePotModeActive;byId('pause').textContent=matchPaused?'Resume':'Pause';
}
drawScores=()=>{};drawTargetBallIndicator=()=>{};drawPlayerTurnIndicator=()=>{};drawHelpButton=()=>{};
const originalIndicators=drawDebugModeIndicators;drawDebugModeIndicators=()=>{};
function mouseMoved(){if(!matchPaused&&currentPlayer===PLAYER_ID.HUMAN&&currentGameState===GAME_STATE.AIMING&&cueBall?.body&&!cue.isPoweringUp)cue.angle=Math.atan2(mouseY-cueBall.body.position.y,mouseX-cueBall.body.position.x);}
document.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('restart').onclick=()=>{debugForcePotModeActive=false;setup();updateInterface();};
 document.getElementById('pause').onclick=()=>{matchPaused=!matchPaused;keyStates={a:false,d:false};updateInterface();};
 document.getElementById('layout').onchange=e=>{matchGeneration++;clearTimeout(cpuTimer);currentPlayer=PLAYER_ID.HUMAN;debugForcePotModeActive=false;switchBallSetupMode(Number(e.target.value));};
 document.getElementById('practice').onchange=e=>debugForcePotModeActive=e.target.checked;
 document.getElementById('shoot').onclick=()=>{if(matchPaused||currentGameState!==GAME_STATE.AIMING)return;cue.power=Number(document.getElementById('power').value)/100*MAX_CUE_POWER;cue.isPoweringUp=true;mouseReleased();};
});
window.addEventListener('blur',()=>{keyStates={a:false,d:false};cue.isPoweringUp=false;});
