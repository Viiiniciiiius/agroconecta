import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { getSolution } from '../api/solution';
import { SolutionDetailsProps } from '../types/solution';

export const SolutionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<SolutionDetailsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchSolution = async () => {
      setLoading(true);
      try {
        const data = await getSolution(id);
        setSolution(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da solução:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

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
              {solution.details && (
                <Typography variant="body1" gutterBottom>
                  <strong>Detalhes:</strong> {solution.details}
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
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
};

export default SolutionDetailsPage;
