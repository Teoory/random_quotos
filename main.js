<script>
  // JSON dosyasındaki verileri çekmek için XMLHttpRequest kullanıyoruz
  var request = new XMLHttpRequest();
  request.open('GET', 'quotes.json');
  request.responseType = 'json';
  request.send();

  // JSON dosyasındaki veriler yüklendiğinde çalışacak olan fonksiyon
  request.onload = function() {
    var quotes = request.response;
    var numQuotes = Object.keys(quotes).length;

    // Rastgele bir id seçmek için bir fonksiyon
    function randomQuoteId() {
      return Math.floor(Math.random() * numQuotes) + 1;
    }

    // Sayfa yenilendiğinde rastgele bir quote göstermek için gerekli kod
    var quoteId = randomQuoteId();
    var quote = quotes[quoteId]['quote'];
    var author = quotes[quoteId]['author'];

    var quoteDisplay = document.getElementById('quote');
    quoteDisplay.textContent = quote;

    var authorDisplay = document.getElementById('author');
    authorDisplay.textContent = 'Author: ' + author;

    // New Quote butonuna tıklanınca rastgele bir quote göstermek için gerekli kod
    var newQuoteBtn = document.getElementById('new-quote-btn');
    newQuoteBtn.addEventListener('click', function() {
      var newQuoteId = randomQuoteId();
      while (newQuoteId == quoteId) {
        newQuoteId = randomQuoteId();
      }
      quoteId = newQuoteId;
      quote = quotes[quoteId]['quote'];
      author = quotes[quoteId]['author'];
      quoteDisplay.textContent = quote;
      authorDisplay.textContent = 'Author: ' + author;
    });

    // Submit butonuna tıklanınca girilen sayı kadar quote göstermek için gerekli kod
    var submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
      var quoteNumber = document.getElementById('quote-number-input').value;
      if (quoteNumber > numQuotes) {
        quoteNumber = numQuotes;
      }
      for (var i = 0; i < quoteNumber; i++) {
        var newQuoteId = randomQuoteId();
        while (newQuoteId == quoteId) {
          newQuoteId = randomQuoteId();
        }
        quoteId = newQuoteId;
        quote = quotes[quoteId]['quote'];
        author = quotes[quoteId]['author'];
        var newQuoteDisplay = document.createElement('div');
        newQuoteDisplay.innerHTML = '<h2>Quote:</h2><p>' + quote + '</p><p>'Author: ' + author + '</p>';
        document.body.appendChild(newQuoteDisplay);
      }
    });
  };
