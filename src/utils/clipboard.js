/**
 * 剪贴板工具函数
 * 
 * 提供跨浏览器兼容的剪贴板操作功能
 * 功能包括：
 * - 复制文本到剪贴板
 * - 兼容性检查
 * - 错误处理
 * - 成功反馈
 */

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 返回是否成功复制
 */
export const copyToClipboard = async (text) => {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    console.warn('copyToClipboard: Not in browser environment');
    return false;
  }

  // 检查输入参数
  if (!text || typeof text !== 'string') {
    console.warn('copyToClipboard: Invalid text parameter');
    return false;
  }

  try {
    // 方法1: 使用现代Clipboard API（推荐）
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard using Clipboard API:', text);
      return true;
    }

    // 方法2: 使用传统的execCommand方法（兼容旧浏览器）
    if (document.execCommand) {
      return fallbackCopyToClipboard(text);
    }

    // 如果两种方法都不支持
    console.warn('copyToClipboard: Clipboard operations not supported');
    return false;

  } catch (error) {
    console.error('Error copying to clipboard:', error);
    
    // 如果现代API失败，尝试降级方案
    if (document.execCommand) {
      return fallbackCopyToClipboard(text);
    }
    
    return false;
  }
};

/**
 * 降级复制方案（使用execCommand）
 * @param {string} text - 要复制的文本
 * @returns {boolean} - 返回是否成功复制
 */
const fallbackCopyToClipboard = (text) => {
  try {
    // 创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 设置样式使其不可见
    textArea.style.position = 'fixed';
    textArea.style.top = '-1000px';
    textArea.style.left = '-1000px';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    // 添加到DOM
    document.body.appendChild(textArea);

    // 选择文本
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    // 执行复制命令
    const successful = document.execCommand('copy');

    // 从DOM中移除
    document.body.removeChild(textArea);

    if (successful) {
      console.log('Text copied to clipboard using execCommand:', text);
      return true;
    } else {
      console.warn('execCommand copy failed');
      return false;
    }

  } catch (error) {
    console.error('Fallback copy method failed:', error);
    return false;
  }
};

/**
 * 检查剪贴板API是否可用
 * @returns {boolean} - 返回是否支持剪贴板操作
 */
export const isClipboardSupported = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  // 检查现代Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return true;
  }

  // 检查传统execCommand
  if (document.execCommand) {
    return true;
  }

  return false;
};

/**
 * 从剪贴板读取文本（如果支持）
 * @returns {Promise<string|null>} - 返回剪贴板中的文本或null
 */
export const readFromClipboard = async () => {
  if (typeof window === 'undefined') {
    console.warn('readFromClipboard: Not in browser environment');
    return null;
  }

  try {
    // 检查是否支持读取权限
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText();
      console.log('Text read from clipboard:', text);
      return text;
    }

    console.warn('readFromClipboard: Clipboard read not supported');
    return null;

  } catch (error) {
    console.error('Error reading from clipboard:', error);
    return null;
  }
};

/**
 * 请求剪贴板权限
 * @returns {Promise<boolean>} - 返回是否获得权限
 */
export const requestClipboardPermission = async () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    if (navigator.permissions && navigator.permissions.query) {
      const permission = await navigator.permissions.query({ name: 'clipboard-write' });
      return permission.state === 'granted' || permission.state === 'prompt';
    }
    
    // 如果不支持权限查询，假设支持
    return isClipboardSupported();

  } catch (error) {
    console.error('Error requesting clipboard permission:', error);
    return false;
  }
};

/**
 * 复制富文本到剪贴板（HTML内容）
 * @param {string} html - HTML内容
 * @param {string} text - 纯文本备用
 * @returns {Promise<boolean>} - 返回是否成功复制
 */
export const copyRichTextToClipboard = async (html, text) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text || html], { type: 'text/plain' })
      });

      await navigator.clipboard.write([clipboardItem]);
      console.log('Rich text copied to clipboard');
      return true;
    }

    // 降级到纯文本复制
    return await copyToClipboard(text || html);

  } catch (error) {
    console.error('Error copying rich text to clipboard:', error);
    // 降级到纯文本复制
    return await copyToClipboard(text || html);
  }
};

/**
 * 复制URL并添加额外信息
 * @param {string} url - URL地址
 * @param {string} title - 网站标题（可选）
 * @param {string} description - 描述信息（可选）
 * @returns {Promise<boolean>} - 返回是否成功复制
 */
export const copyUrlWithInfo = async (url, title = '', description = '') => {
  let textToCopy = url;

  if (title || description) {
    textToCopy = `${title ? title + '\n' : ''}${url}${description ? '\n' + description : ''}`;
  }

  return await copyToClipboard(textToCopy);
};

export default {
  copyToClipboard,
  isClipboardSupported,
  readFromClipboard,
  requestClipboardPermission,
  copyRichTextToClipboard,
  copyUrlWithInfo
}; 