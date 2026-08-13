export function getGradeCategory(gradeStr?: string): 'chu1' | 'chu2' | 'chu3' | 'gao1' | 'gao2' | 'gao3' | 'other' {
  if (!gradeStr) return 'other';
  const s = gradeStr.toLowerCase();
  
  // Check for Middle School Grade 1 / 初一 / 7年级
  if (s.includes('初一') || s.includes('七年级') || s.includes('grade 7') || s.includes('7年级') || s.includes('初中一年级') || s.includes('初1')) {
    return 'chu1';
  }
  // Check for Middle School Grade 2 / 初二 / 8年级
  if (s.includes('初二') || s.includes('八年级') || s.includes('grade 8') || s.includes('8年级') || s.includes('初中二年级') || s.includes('初2')) {
    return 'chu2';
  }
  // Check for Middle School Grade 3 / 初三 / 9年级 / 中考
  if (s.includes('初三') || s.includes('九年级') || s.includes('grade 9') || s.includes('9年级') || s.includes('中考') || s.includes('初中三年级') || s.includes('初3')) {
    return 'chu3';
  }
  // Check for High School Grade 1 / 高一 / 10年级
  if (s.includes('高一') || s.includes('grade 10') || s.includes('10年级') || s.includes('高中一年级') || s.includes('高1')) {
    return 'gao1';
  }
  // Check for High School Grade 2 / 高二 / 11年级
  if (s.includes('高二') || s.includes('grade 11') || s.includes('11年级') || s.includes('高中二年级') || s.includes('高2')) {
    return 'gao2';
  }
  // Check for High School Grade 3 / 高三 / 12年级 / 高考
  if (s.includes('高三') || s.includes('高考') || s.includes('grade 12') || s.includes('12年级') || s.includes('高中三年级') || s.includes('高3')) {
    return 'gao3';
  }
  
  return 'other';
}

/**
 * Returns true IF AND ONLY IF itemGrade belongs to the exact same grade category as userGrade.
 * Prevents "高一" from matching "初一", "初二" from matching "高二", etc.
 */
export function matchGradeStrict(itemGrade?: string, userGrade?: string): boolean {
  if (!userGrade) return true;
  if (!itemGrade) return true;
  
  const userCat = getGradeCategory(userGrade);
  const itemCat = getGradeCategory(itemGrade);
  
  if (userCat !== 'other' && itemCat !== 'other') {
    return userCat === itemCat;
  }
  
  // Fallback if custom non-standard grade string
  const u = userGrade.trim().toLowerCase();
  const i = itemGrade.trim().toLowerCase();
  return i === u || i.includes(u) || u.includes(i);
}
