async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function decryptContent(button) {
  const parent = button.closest('.secure-content');
  const userInput = parent.querySelector('.pass-input').value;
  const errorMsg = parent.querySelector('.error-msg');
  const contentDisplay = parent.querySelector('.content-display');
  const passwordBox = parent.querySelector('.password-box');

  const correctHash = parent.getAttribute('data-hash');
  const encryptedData = parent.getAttribute('data-encrypted');

  const userHash = await sha256(userInput);

  if (userHash === correctHash) {
    try {
      const rawMarkdown = atob(encryptedData);
      const htmlContent = marked.parse(rawMarkdown);

      // Menggunakan Tailwind classList untuk menyembunyikan/menampilkan
      contentDisplay.innerHTML = htmlContent;
      contentDisplay.classList.remove('hidden');
      passwordBox.classList.add('hidden');
      errorMsg.classList.add('hidden');
    } catch (e) {
      errorMsg.innerText = "⚠️ Gagal memproses dan menyusun konten.";
      errorMsg.classList.remove('hidden');
    }
  } else {
    errorMsg.classList.remove('hidden');
  }
}