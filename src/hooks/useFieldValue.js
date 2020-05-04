//import React, { useEffect, useState } from 'react';

export default function useFieldValue(fieldId) {
  const field = document.getElementById(fieldId);

  // The element does not exist: return null
  if (field == null) return null;
  // The element is not a field: return null
  if (field.tagName !== 'INPUT') return null;

  return field.value;
};