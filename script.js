var leverageInput = document.getElementById("leverage");
var leverageValueSpan = document.getElementById("leverageValue");
const today = new Date();
const offset = today.getTimezoneOffset(); // Get the timezone offset in minutes
const localDateTime = new Date(today.getTime() - offset * 60 * 1000);
const todayString = localDateTime.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
document.getElementById("date").value = todayString;

var avatarImage;
var qrImage = "images/qrcode.png";

function cardBackBackGround(profit) {
  // Get references to the necessary DOM elements
  const cardBack = document.getElementById("output");
  const cardType = document.getElementById("cardtype");

  // Define CSS classes for different card types
  const cardClasses = {
    bybit: ["bybit"],
    bitget: ["bitget"],
    binance1: ["binance-bg-rocket"],
    binance2: ["binance-bg-circle"],
  };

  // Function to update card classes based on the selected card type
  function updateCardClasses(selectedType) {
    // Remove all existing classes from the cardBack element
    cardBack.classList.remove(
      ...cardClasses["bybit"],
      ...cardClasses["bitget"],
      ...cardClasses["binance1"],
      ...cardClasses["binance2"]
    );

    // Add classes based on the selected card type
    cardBack.classList.add(...cardClasses[selectedType]);
  }

  // Accessing individual elements of the 'binance' array
  const binanceFirstElement = "binance1"; // Updated key
  const binanceSecondElement = "binance2"; // Updated key

  // Checking the card type and profit condition
  if (cardType.value === "binance") {
    if (profit >= 100) {
      // If profit is greater than or equal to 100, use the first element of the 'binance' array
      updateCardClasses(binanceSecondElement);
    } else {
      // Otherwise, use the second element of the 'binance' array
      updateCardClasses(binanceFirstElement);
    }
  } else {
    // Handle other card types if needed
    updateCardClasses(cardType.value);
  }
}

function validateForm() {
  const handleInput = document.getElementById("handle");
  const handleSubInput = document.getElementById("handleSub");
  const symbolInput = document.getElementById("symbol");
  const entryPriceInput = document.getElementById("entryPrice");
  const currentPriceInput = document.getElementById("currentPrice");
  const referralCodeInput = document.getElementById("referralCode");
  const displayTradeBtn = document.getElementById("displayTradeBtn");

  // Empty validation
  const handleIsEmpty = handleInput.value.trim() === "";
  const symbolIsEmpty = symbolInput.value.trim() === "";
  const entryPriceIsEmpty = entryPriceInput.value.trim() === "";
  const currentPriceIsEmpty = currentPriceInput.value.trim() === "";
  const referralCodeIsEmpty = referralCodeInput.value.trim() === "";

  // Enable/disable the button based on validation
  displayTradeBtn.disabled =
    handleIsEmpty ||
    symbolIsEmpty ||
    entryPriceIsEmpty ||
    currentPriceIsEmpty ||
    referralCodeIsEmpty;
}
validateForm();

function readAvatar(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    avatarImage = URL.createObjectURL(input.files[0]);

    reader.onload = function (e) {
      document.querySelector(
        ".handleAvatar"
      ).style.backgroundImage = `url('${e.target.result}')`;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function readQr(input) {
  if (input.files && input.files[0]) {
    qrImage = URL.createObjectURL(input.files[0]);
  }
}

function resetForm() {
  var tradeCard = document.getElementById("tradeCard");
  var output = document.getElementById("output");

  // Reset form fields to initial values
  document.getElementById("date").value = todayString;
  document.getElementById("handle").value = "@JustProfit";
  document.getElementById("handleSub").value = "JustProfit";
  document.querySelector(".tab.active").classList.remove("active");
  document.querySelector(".tab").classList.add("active");
  document.getElementById("leverage").value = "20";
  leverageValueSpan.innerHTML = "20x";
  document.getElementById("entryPrice").value = "8.2487";
  document.getElementById("currentPrice").value = "9.2154";
  document.getElementById("referralCode").value = "1XV1FJV3";

  // Toggle card flip to front side
  tradeCard.classList.remove("flipped");
  output.innerHTML = "";
}

leverageInput.addEventListener("input", function () {
  leverageValueSpan.innerHTML = leverageInput.value + "x";
});

function setTab(tabName) {
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.classList.remove("active");
  });
  var selectedTab = event.target;
  selectedTab.classList.add("active");
}

function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function toggleTradeInfo() {
  var tradeCard = document.getElementById("tradeCard");
  var output = document.getElementById("output");

  // Toggle card flip
  tradeCard.classList.toggle("flipped");

  // Display trade information on the back of the card
  if (tradeCard.classList.contains("flipped")) {
    const inputDateString = new Date(document.getElementById("date").value);

    const formattedDate = `${inputDateString.getFullYear()}/${padZero(
      inputDateString.getMonth() + 1
    )}/${padZero(inputDateString.getDate())} ${padZero(
      inputDateString.getHours()
    )}:${padZero(inputDateString.getMinutes())}`;

    const entryPrice = parseFloat(document.getElementById("entryPrice").value);
    const currentPrice = parseFloat(
      document.getElementById("currentPrice").value
    );
    const leverage = parseFloat(document.getElementById("leverage").value);

    var profitPercentage =
      ((currentPrice - entryPrice) / entryPrice) * 100 * leverage;

    var formattedProfit = "+" + Math.abs(profitPercentage).toFixed(2);
    const cardType = document.getElementById("cardtype");

    cardBackBackGround(formattedProfit);

    if (cardType.value === "bitget") {
      output.innerHTML = `<img src="images/full-bitget-logo.png"
                    alt="bitget-logo" width="70px">
                <div id="outputDate">${formattedDate} (UTC+5)</div>
                <div class="row twitterHandle">
                    <div id="handleAvatar" style="background:url('${avatarImage}');"></div>
                    <div class="column">
                        <div id="outputHandle">${
                          document.getElementById("handle").value
                        }</div>
                        <div id="outputHandleSub">${
                          document.getElementById("handleSub").value
                        }</div>
                    </div>
                </div>
                <div id="outputSymbol" class="outputSymbol">${
                  document.getElementById("symbol").value
                }</div>
                <div class="row position">
                    <div class="lightblue outputPosition" id="outputPosition" style="color:${
                      document.querySelector(".tab.active").innerText == "Short"
                        ? "#AD454A"
                        : ""
                    }">${document.querySelector(".tab.active").innerText}</div>
                    <div style="color: #818181;"><span class="">|</span></div>
                    <div class="gray outputLeverage" id="outputLeverage">${
                      document.getElementById("leverage").value
                    }X</div>
                </div>
                <div class="lightblue outputProfit" id="outputProfit">${formattedProfit}%</div>
                <div class="row entryPriceRow">
                    <div>Entry Price</div>
                    <div
                        id="outputEntryPrice"> ${
                          document.getElementById("entryPrice").value
                        }</div>
                </div>
                <div class="row currentPriceRow">
                    <div>Current Price</div>
                    <div id="outputCurrentPrice">${
                      document.getElementById("currentPrice").value
                    }</div>
                </div>
                <div class="row referralCodeRow align-center" ><div>Referral Code: <span
                            id="outputReferralCode">${
                              document.getElementById("referralCode").value
                            }</span></div>
                    <img src="${qrImage}" alt="QR Code" id="qrImage" class="qrImage">
                </div>
                <button class="reset-button"
                    onclick="resetForm()">Reset</button>`;
    } else if (cardType.value === "bybit") {
      output.innerHTML = `<img src="images/bybit_logo.png"
                    alt="bitget-logo" width="55px">
                    <div class="gap"></div>
                </div>
                <div class="symbol outputSymbol" id="outputSymbol">${
                  document.getElementById("symbol").value
                }
                <div class="green small outputPosition ${
                  document.querySelector(".tab.active").innerText == "Short"
                    ? "red"
                    : ""
                }" id="outputPosition" style="color:${
        document.querySelector(".tab.active").innerText == "Short"
          ? "#AD454A"
          : ""
      }">${document.querySelector(".tab.active").innerText} ${Number(
        document.getElementById("leverage").value
      ).toFixed(1)}X</div>
                </div>
                
                <div class="gray" id="ROI">ROI <div class="green profitfont outputProfit" id="outputProfit">${formattedProfit}%</div></div>
                
                <div class="bybitPricelabel entryPriceRow" style="padding:0px;" >
                    <div>Entry Price</div>
                    <div
                        class="price" id="outputEntryPrice"> ${
                          document.getElementById("entryPrice").value
                        }</div>
                </div>
                <div class="bybitPricelabel currentPriceRow">
                    <div>Current Price</div>
                    <div class="price" id="outputCurrentPrice">${
                      document.getElementById("currentPrice").value
                    }</div>
                </div>
                <div class="gap"></div>
                <div class="black bybitbottom referralCodeRow">
                    <div class = "column flex-evenly">
                        <div class="black">Join and claim over $5000 in bonuses!</div>
                        <div class="referral" id="outputReferralCode">Referral Code:
                            ${document.getElementById("referralCode").value}
                         </div>
                    </div>
                        <img src="${qrImage}" alt="QR Code" id="qrImage" class="qrImage">
                </div>
                <button class="reset-button"
                    onclick="resetForm()">Reset</button>`;
    } else if (cardType.value === "binance") {
      output.innerHTML = `<img src="images/binance/bin_logo.png"
                    alt="binance-logo" class="binance-logo">

               <div class="binance-second-half">
                <div class="binance row position">
                    <div class="binance-green" id="outputPosition" style="color:${
                      document.querySelector(".tab.active").innerText == "Short"
                        ? "#AD454A"
                        : ""
                    }">${document.querySelector(".tab.active").innerText}</div>
                    <div><span class="gray binance-padding">|</span></div>
                    <div id="outputLeverage" class="binance-padding-left" >${
                      document.getElementById("leverage").value
                    }x </div> <span class="gray binance-padding">|</span>
                    <div id="outputSymbol" class="binance-symbol">${
                      document.getElementById("symbol").value
                    }</div>

                </div>
                <div class="binance-green binance-profit" id="outputProfit">${formattedProfit}%</div>
                <div class="row binance entryPriceRow">
                    <div>Entry Price</div>
                    <div class="binance-color"
                        id="outputEntryPrice"> ${
                          document.getElementById("entryPrice").value
                        }</div>
                </div>
                <div class="row binance currentPriceRow">
                    <div class="binance-space">Last Price</div>
                    <div id="outputCurrentPrice" class="binance-color">${
                      document.getElementById("currentPrice").value
                    }</div>
                </div>
                <div class="row referralCodeRow binance-align-center" >
                    <img src="${qrImage}" alt="QR Code" id="qrImage" class="binance qrImage">
                    <div class="binance-container">
                    <div class="gray binance-referral-code">Referral Code </div>
                    <div id="outputReferralCode" class="binance-code">${
                      document.getElementById("referralCode").value
                    }</div>
                    <div class="binance-color binance-referral-code">Get the Binance App</div>
                    </div>
                    </div>

                </div>
                <button class="reset-button"
                    onclick="resetForm()">Reset</button>`;
    } else {
      output.innerHTML = `<div>not valid choice</div>`;
    }
  } else {
    output.innerHTML = "";
  }

  window.scrollTo(0, 0);
}
