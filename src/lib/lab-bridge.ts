// Lab CMS visual editor — powers live preview in the Lab admin.
const LAB_ORIGIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)*phxlab\.io$/;

export function isEmbeddedInLab(): boolean {
  return window.self !== window.top;
}

type LabMessage =
  | { type: 'lab:content'; blockId: string; block: Record<string, unknown> }
  | { type: 'lab:render'; blocks: Record<string, unknown>[] }
  | { type: 'lab:highlight'; blockId: string | null };

let currentSelectedId: string | null = null;

function applyHighlight(): void {
  for (const el of document.querySelectorAll('[data-lab-selected]')) {
    el.removeAttribute('data-lab-selected');
  }
  if (currentSelectedId) {
    document
      .querySelector(`[data-lab-id="${CSS.escape(currentSelectedId)}"]`)
      ?.setAttribute('data-lab-selected', '');
  }
}

async function renderBlocks(
  blocks: Record<string, unknown>[],
): Promise<string> {
  const res = await fetch('/api/lab-preview.json', {
    method: 'POST',
    body: JSON.stringify(blocks),
  });
  return res.text();
}

function reExecuteScripts(root: ParentNode): void {
  for (const old of root.querySelectorAll('script')) {
    const fresh = document.createElement('script');
    for (const { name, value } of old.attributes)
      fresh.setAttribute(name, value);
    fresh.textContent = old.textContent;
    old.replaceWith(fresh);
  }
}

async function patchBlock(
  blockId: string,
  block: Record<string, unknown>,
): Promise<void> {
  const target = document.querySelector(
    `[data-lab-id="${CSS.escape(blockId)}"]`,
  );
  if (!target) return;
  const html = await renderBlocks([block]);
  target.outerHTML = html;
  const replaced = document.querySelector(
    `[data-lab-id="${CSS.escape(blockId)}"]`,
  );
  if (replaced) reExecuteScripts(replaced.parentElement ?? document.body);
  applyHighlight();
}

async function patchAll(blocks: Record<string, unknown>[]): Promise<void> {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = await renderBlocks(blocks);
  reExecuteScripts(main);
  applyHighlight();
}

export function initLabBridge(): void {
  if (!isEmbeddedInLab()) return;

  window.addEventListener('message', (event) => {
    if (!LAB_ORIGIN_PATTERN.test(event.origin)) return;
    const msg = event.data as LabMessage;
    if (msg.type === 'lab:content') patchBlock(msg.blockId, msg.block);
    else if (msg.type === 'lab:render') patchAll(msg.blocks);
    else if (msg.type === 'lab:highlight') {
      currentSelectedId = msg.blockId;
      applyHighlight();
    }
  });

  document.addEventListener('click', (event) => {
    const target = (event.target as Element).closest('[data-lab-id]');
    window.parent.postMessage(
      {
        type: 'lab:select',
        blockId: target?.getAttribute('data-lab-id') ?? null,
      },
      '*',
    );
  });

  window.parent.postMessage({ type: 'lab:ready' }, '*');
}
