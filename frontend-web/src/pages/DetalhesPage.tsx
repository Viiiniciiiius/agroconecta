import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { getSolution, deleteSolution } from '../api/solution';

// Interface para os dados que vêm do backend
interface SolutionFromBackend {
  id: string;
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery';
  description?: string; // Backend retorna 'description' ao invés de 'details'
  priceDollar?: number;
  link?: string;
  publishDate: string;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const SolutionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<SolutionFromBackend | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      await deleteSolution(id);
      // Redirecionar para a página principal após deletar
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir solução:', error);
      setError('Erro ao excluir a solução. Tente novamente.');
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
        <Typography variant="body1" align="center">Carregando detalhes da solução...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" align="center" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!solution) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" align="center">Nenhuma solução encontrada.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', my: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            boxShadow: 4,
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(136,0,34,0.1))'
          }}
        >
          <Typography variant="h4" fontWeight={600} color="#880022" gutterBottom>
            {solution.title}
          </Typography>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <strong>Categoria:</strong> {solution.category}
              </Typography>
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
              {solution.starRating !== undefined && (
                <Typography variant="body1" gutterBottom>
                  <strong>Classificação:</strong> {solution.starRating} / 5
                </Typography>
              )}
              {solution.ownerContact && (
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
              {solution.createdAt && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <strong>Criado em:</strong> {new Date(solution.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 2 }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: '#880022',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={handleDelete}
              >
                Excluir Solução
              </motion.button>
            </Box>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
};

export default SolutionDetailsPage;
