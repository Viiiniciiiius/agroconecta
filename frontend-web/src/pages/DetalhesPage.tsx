import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Link, Button, CircularProgress } from '@mui/material';
import { getSolution, deleteSolution } from '../api/solution';
import { CATEGORIES_CONFIG, CategoryType, getSubcategoryLabel } from '../utils/categories';
import { SolutionFromBackend } from '../types/solution';

export const SolutionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<SolutionFromBackend | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const adminToken = localStorage.getItem('token') || '';
  const ADMIN_MODE = import.meta.env.VITE_ADMIN_MODE === 'true';


  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchSolution = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSolution(id);
        setSolution(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da solução:', error);
        setError('Erro ao carregar os detalhes da solução. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      return;
    }
    try {
      await deleteSolution(id, adminToken);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir solução:', error);
      setError('Erro ao excluir a solução, talvez seu token seja inválido.');
    }
  };

  if (!id) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" align="center">ID da solução não fornecido.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(25, 205, 148, 0.1))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress variant="indeterminate" size={24} />
          <Typography variant="h4" align="center">Carregando detalhes da solução...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(184, 86, 0, 0.1), rgba(205, 25, 25, 0.1))'
          }}
        >
          <Typography variant="h4" align="center" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!solution) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(129, 144, 144, 0.1), rgba(77, 205, 165, 0.1))'
          }}
        >
          <Typography variant="h4" align="center" color="gray">Nenhuma solução encontrada.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', my: 4 }}>
      <Box 
        sx={{ 
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper', 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(25, 205, 148, 0.1))'
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#0FA173" sx={{pb: 4}} gutterBottom>
          {solution.title}
        </Typography>
        <Card sx={{ 
          mt: 2,
          borderRadius: 2,
          boxShadow: 0,
        }}>
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography variant="body1" gutterBottom>
              <strong>Categoria:</strong> {CATEGORIES_CONFIG[solution.category as CategoryType]?.label || solution.category}
            </Typography>
            {solution.subcategory && (
              <Typography variant="body1" gutterBottom>
                <strong>Subcategoria:</strong> {getSubcategoryLabel(solution.category as CategoryType, solution.subcategory)}
              </Typography>
            )}
            {solution.description && (
              <Typography variant="body1" gutterBottom>
                <strong>Descrição:</strong> {solution.description}
              </Typography>
            )}
            {solution.priceDollar !== undefined && (
              <Typography variant="body1" gutterBottom>
                <strong>Preço:</strong> ${solution.priceDollar}
              </Typography>
            )}
            {solution.link && (
              <Typography variant="body1" gutterBottom>
                <strong>Link:</strong> <Link href={solution.link} target="_blank" rel="noopener">{solution.link}</Link>
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              <strong>Data de Publicação:</strong> {new Date(solution.publishDate).toLocaleDateString()}
            </Typography>
            {solution.dataColeta && (
              <Typography variant="body1" gutterBottom>
                <strong>Data da Coleta:</strong> {(() => {
                  const d = new Date(solution.dataColeta);
                  return isNaN(d.getTime()) ? solution.dataColeta : d.toLocaleDateString();
                })()}
              </Typography>
            )}
            {solution.starRating !== undefined && (
              <Typography variant="body1" gutterBottom>
                <strong>Classificação:</strong> {solution.starRating} / 5
              </Typography>
            )}
            {solution.ownerContact && (solution.ownerContact.email || solution.ownerContact.phone || solution.ownerContact.other) && (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Contato do Proprietário:</strong>
                </Typography>
                {solution.ownerContact.email && (
                  <Typography variant="body2">
                    <strong>Email:</strong> {solution.ownerContact.email}
                  </Typography>
                )}
                {solution.ownerContact.phone && (
                  <Typography variant="body2">
                    <strong>Telefone:</strong> {solution.ownerContact.phone}
                  </Typography>
                )}
                {solution.ownerContact.other && (
                  <Typography variant="body2">
                    <strong>Outros:</strong> {solution.ownerContact.other}
                  </Typography>
                )}
                </>
            )}
            {!solution.ownerContact && (
              <Typography variant="body2" color="text.secondary">
                via plataforma
              </Typography>
            )}
            {solution.createdAt && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <strong>Criado em:</strong> {new Date(solution.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </CardContent>
          {(ADMIN_MODE || adminToken) && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 2 }}>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  borderColor: 'error.main',
                  color: 'error.main',
                  '&:hover': {
                    borderColor: 'error.dark',
                    backgroundColor: 'error.light',
                    color: 'error.contrastText',
                  },
                }}
                onClick={handleDelete}
              >
                Excluir Solução
              </Button>
            </Box>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default SolutionDetailsPage;
