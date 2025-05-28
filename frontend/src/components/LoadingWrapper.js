import React, { useEffect, useState } from 'react';
import './LoadingWrapper.css'; // Importando CSS do spinner

const LoadingWrapper = ({ fetchData, children }) => {
  const [loading, setLoading] = useState(true);
  const [shouldRetry, setShouldRetry] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchData();
        setLoading(false);
      } catch (error) {
        console.warn('Erro ao buscar dados. Tentando novamente em 5s...');
        setTimeout(() => {
          setShouldRetry(prev => !prev);
        }, 5000);
      }
    };
    loadData();
  }, [shouldRetry, fetchData]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Carregando dados, aguarde...</p>
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
