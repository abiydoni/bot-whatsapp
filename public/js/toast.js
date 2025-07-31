function showTWToast({ type = 'success', message = '' }) {
  const containerId = 'tw-toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'fixed top-2 right-2 z-[9999] flex flex-col gap-2 items-end';
    document.body.appendChild(container);
  }
  let colorClass = '', iconSvg = '', srLabel = '';
  if (type === 'success') {
    colorClass = 'text-green-500 bg-green-100';
    iconSvg = `<svg class=\"w-5 h-5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z\"/></svg>`;
    srLabel = 'Check icon';
  } else if (type === 'error' || type === 'danger') {
    colorClass = 'text-red-500 bg-red-100';
    iconSvg = `<svg class=\"w-5 h-5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z\"/></svg>`;
    srLabel = 'Error icon';
  } else if (type === 'warning') {
    colorClass = 'text-orange-500 bg-orange-100';
    iconSvg = `<svg class=\"w-5 h-5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z\"/></svg>`;
    srLabel = 'Warning icon';
  }
  const toastHTML = `
    <div class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white/40 backdrop-blur-md border border-white/30 rounded-lg shadow-sm transition-opacity duration-300 opacity-0" role="alert">
      <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 ${colorClass} rounded-lg">
        ${iconSvg}
        <span class="sr-only">${srLabel}</span>
      </div>
      <div class="ms-3 text-sm font-normal">${message}</div>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = toastHTML;
  const toast = wrapper.firstElementChild;
  container.appendChild(toast);
  // Trigger fade-in
  requestAnimationFrame(() => {
    toast.classList.add('opacity-100');
  });
  setTimeout(() => {
    toast.classList.remove('opacity-100'); // fade-out
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

if (!document.getElementById('tw-toast-style')) {
  const style = document.createElement('style');
  style.id = 'tw-toast-style';
  style.innerHTML = `
    @keyframes fade-in { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
    .animate-fade-in { animation: fade-in 0.2s; }
  `;
  document.head.appendChild(style);
}