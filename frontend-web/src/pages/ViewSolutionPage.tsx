import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, Pagination, SelectChangeEvent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getSolutions } from '../api/solution';
import { SolutionCardProps } from '../types/solution';
import { CATEGORIES_CONFIG, CategoryType, getSubcategoryLabel } from '../config/categories';
//import { solutionsSeed } from '../utils/solutionsSeed';

export const ViewSolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<SolutionCardProps[]>(() => []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const fetchSolutions = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSolutions(selectedCategory);
      /*solutionsSeed.filter(solution => 
        selectedCategory ? solution.category === selectedCategory : true
      );*/

      setSolutions(data);
    } catch (error) {
      console.error('Erro ao buscar soluções:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value as string);
    setPage(1);
  };

  const handleCardClick = (id: string) => {
    console.log('Navigating to solution with ID:', id);
    navigate(`/solution/${id}`);
  };

  // Lógica de paginação (client-side)
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = Array.isArray(solutions)
    ? solutions.slice(indexOfFirstItem, indexOfLastItem)
    : [];
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
            textAlign: 'center',
            border: '1px solid rgba(136, 0, 34, 0.2)'
          }}
        >
          <Typography 
            variant="h3" 
            fontWeight={700} 
            color="#880022" 
            gutterBottom
            sx={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 3
            }}
          >
            Ver Soluções
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}
          >
            Explore soluções inovadoras para o agronegócio. Filtre por categoria para encontrar exatamente o que você precisa.
          </Typography>
          
          <FormControl 
            fullWidth 
            sx={{ 
              mt: 2,
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            <InputLabel id="filter-category-label">Filtrar por categoria</InputLabel>
            <Select
              labelId="filter-category-label"
              label="Filtrar por categoria"
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#880022',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#880022',
                  },
                },
              }}
            >
                <MenuItem value="">
                  <em>Todas as categorias</em>
                </MenuItem>
                {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => (
                  <MenuItem key={key} value={key}>
                    {config.label}
                  </MenuItem>
                ))}
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
          <Box sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 4,
            width: '100%',
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(136,0,34,0.1))',
            textAlign: 'center',
            border: '1px solid rgba(136, 0, 34, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}>
            <Typography variant="h5" color='#880022' sx={{ fontWeight: 600 }}>Carregando soluções...</Typography>
          </Box>
        ) : currentSolutions.length === 0 ? (
          <Box sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 4,
            width: '100%',
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(136,0,34,0.1))',
            textAlign: 'center',
            border: '1px solid rgba(136, 0, 34, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}>
            <Typography 
              variant="h5" 
              color='text.secondary'
              sx={{ 
                textAlign: 'center',
                mb: 2,
                fontWeight: 600
              }}
            >
              Nenhuma solução encontrada
            </Typography>
            <Typography 
              variant="body1" 
              color='text.secondary' 
              sx={{ 
                textAlign: 'center',
                maxWidth: '400px'
              }}
            >
              Tente ajustar os filtros ou adicionar uma nova solução
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {currentSolutions.map(solution => (
              <Grid item xs={12} sm={6} md={4} key={solution.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                      border: '2px solid #880022'
                    }
                  }}
                  onClick={() => handleCardClick(solution.id)}
                >
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    p: 3,
                    textAlign: 'left'
                  }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#880022',
                        mb: 2,
                        lineHeight: 1.3,
                        textAlign: 'left'
                      }}
                    >
                      {solution.title}
                    </Typography>
                    
                    <Box sx={{ mb: 2, textAlign: 'left' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          backgroundColor: 'rgba(136, 0, 34, 0.1)',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          display: 'inline-block',
                          mb: 1,
                          textAlign: 'center'
                        }}
                      >
                        {CATEGORIES_CONFIG[solution.category as CategoryType]?.label || solution.category}
                      </Typography>
                      
                      {solution.subcategory && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            backgroundColor: 'rgba(0, 131, 136, 0.1)',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            display: 'inline-block',
                            ml: 1,
                            textAlign: 'center'
                          }}
                        >
                          {getSubcategoryLabel(solution.category as CategoryType, solution.subcategory)}
                        </Typography>
                      )}
                    </Box>
                    
                    {solution.priceDollar !== undefined && (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#880022',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          mt: 'auto',
                          textAlign: 'right'
                        }}
                      >
                        ${solution.priceDollar}
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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 6,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 2
        }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#880022',
                '&.Mui-selected': {
                  backgroundColor: '#880022',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(136, 0, 34, 0.8)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(136, 0, 34, 0.1)',
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default ViewSolutionsPage;
