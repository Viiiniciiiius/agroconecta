import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, Pagination, SelectChangeEvent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSolutions } from '../api/solution';
import { SolutionCardProps } from '../types/solution';

export const ViewSolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<SolutionCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const data = await getSolutions(selectedCategory);
      setSolutions(data);
    } catch (error) {
      console.error('Erro ao buscar soluções:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [selectedCategory]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value as string);
    setPage(1);
  };

  const handleCardClick = (id: string) => {
    navigate(`/solution/${id}`);
  };

  // Lógica de paginação (client-side)
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = solutions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(solutions.length / itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', mb: 4 }}>
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
            width: '100%',
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(136,0,34,0.1))',
            mb: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" fontWeight={600} color="#880022" gutterBottom>
            View Solutions
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="filter-category-label">Filtrar por categoria</InputLabel>
            <Select
              labelId="filter-category-label"
              label="Filter by Category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
                <MenuItem value=""><em>Todos</em></MenuItem>
                <MenuItem value="product">Produto</MenuItem>
                <MenuItem value="service">Serviço</MenuItem>
                <MenuItem value="scientific_article">Artigo científico</MenuItem>
                <MenuItem value="machinery">Maquinário</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <Typography variant="body1" align="center">Carregando soluções...</Typography>
        ) : (
          <Grid container spacing={2}>
            {currentSolutions.map(solution => (
              <Grid item xs={12} sm={6} md={4} key={solution.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.03)' }
                  }}
                  onClick={() => handleCardClick(solution.id)}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {solution.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Categoria: {solution.category}
                    </Typography>
                    {solution.priceDollar !== undefined && (
                      <Typography variant="body2" color="text.secondary">
                        Preço: ${solution.priceDollar}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default ViewSolutionsPage;
