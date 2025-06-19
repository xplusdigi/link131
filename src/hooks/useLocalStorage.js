/**
 * useLocalStorage Hook
 * 
 * 用于管理localStorage的React Hook
 * 功能包括：
 * - 自动同步状态与localStorage
 * - 类型安全的存储和读取
 * - 错误处理
 * - SSR兼容性
 */

import { useState, useEffect } from 'react';

/**
 * useLocalStorage Hook
 * @param {string} key - localStorage的键名
 * @param {any} initialValue - 初始值
 * @returns {[any, function]} - 返回[值, 设置函数]
 */
export const useLocalStorage = (key, initialValue) => {
  // 获取初始值的函数
  const getInitialValue = () => {
    // SSR兼容性检查
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // 尝试从localStorage获取数据
      const item = window.localStorage.getItem(key);
      
      // 如果存在数据，解析并返回
      if (item !== null) {
        return JSON.parse(item);
      }
      
      // 如果不存在，返回初始值
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 状态管理
  const [storedValue, setStoredValue] = useState(getInitialValue);

  // 设置值的函数
  const setValue = (value) => {
    try {
      // 允许传入函数来更新状态（类似useState）
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 更新状态
      setStoredValue(valueToStore);
      
      // SSR兼容性检查
      if (typeof window !== 'undefined') {
        // 保存到localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // 触发自定义事件，通知其他组件localStorage发生变化
        window.dispatchEvent(new Event('localStorage'));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听localStorage变化（用于跨标签页同步）
  useEffect(() => {
    // SSR兼容性检查
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e) => {
      // 监听storage事件（跨标签页）
      if (e?.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    const handleLocalStorageChange = () => {
      // 监听自定义localStorage事件（同一页面内）
      try {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          const newValue = JSON.parse(item);
          setStoredValue(newValue);
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}" on change:`, error);
      }
    };

    // 添加事件监听器
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorage', handleLocalStorageChange);

    // 清理函数
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage', handleLocalStorageChange);
    };
  }, [key]);

  // 页面初始化时重新同步（确保最新值）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        try {
          const parsedItem = JSON.parse(item);
          if (JSON.stringify(parsedItem) !== JSON.stringify(storedValue)) {
            setStoredValue(parsedItem);
          }
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    }
  }, []);

  return [storedValue, setValue];
};

/**
 * 删除localStorage中的特定键
 * @param {string} key - 要删除的键名
 */
export const removeFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event('localStorage'));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }
};

/**
 * 清空所有localStorage数据
 */
export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.clear();
      window.dispatchEvent(new Event('localStorage'));
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  }
};

/**
 * 获取localStorage中的所有键
 * @returns {string[]} 所有键名的数组
 */
export const getAllLocalStorageKeys = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.warn('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * 检查localStorage是否可用
 * @returns {boolean} 是否支持localStorage
 */
export const isLocalStorageAvailable = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

export default useLocalStorage; 