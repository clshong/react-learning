import { useCallback, useRef } from "react";

export function useClipboard() {
  const ref = useRef(null)
  /**
   * 剪切板
   * @param text -内容
   */

  const copyToClipboard = useCallback((text) => {
    return new Promise((res, rej) => {
      try {
        let copyText = text
        // 没有值直接获取ref的值
        if (!copyText) {
          copyText = ref.current.value
        }
        // 没有内容则退出
        if (!copyText) {
          const error = '复制的内容不能为空';
          rej(error);
          return;
        }
        // 值类型判断
        if (typeof copyText !== 'string' && typeof copyText !== 'number') {
          const error = '复制的内容必须是字符串或数字';
          rej(error);
          return;
        }
        navigator.clipboard
          .writeText(copyText.toString())
          .then(() => {
            res(copyText);
          })
          .catch((err) => {
            rej(err);
          });

      } catch (error) {
        rej(error)
      }
    })
  })

  /** 获取剪切板数据 */
  const getClipboard = useCallback(() => {
    return navigator.clipboard.readText();
  }, []);

  return { ref, copyToClipboard, getClipboard }
}
