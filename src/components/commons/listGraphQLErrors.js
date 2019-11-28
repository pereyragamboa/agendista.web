import React from 'react';

export default function (queryError) {
  const errors = queryError.graphQLErrors.map((error, index) =>
      <li key={`gqlErr_${index}`}>{error.message}</li>
  );
  if (queryError.networkError) errors.push(
      <li key="gqlErr_Net">{queryError.networkError.message}</li>
  );
  return <ul>{errors}</ul>;
}