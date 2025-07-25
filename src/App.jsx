import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

export default function RickAndMortyApp() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async (query = '', pageNum = 1, spec = '', stat = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageNum}&name=${query}&species=${spec}&status=${stat}`
      );
      setCharacters(response.data.results);
      setHasNextPage(response.data.info.next !== null);
    } catch (err) {
      setCharacters([]);
      setHasNextPage(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(search, page, species, status);
  }, [search, page, species, status]);

 const playSound = () => {
  const audio = new Audio('/gun.mp3');
  audio.volume = 0.2; // Valor entre 0.0 (silencio) y 1.0 (volumen máximo)
  audio.play().catch((err) => {
    console.error('No se pudo reproducir el sonido:', err);
  });
};

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
    <div
  className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10 opacity-30"
  style={{ backgroundImage: "url('/portal.jpg')" }}
></div>


<div className="min-h-screen bg-gradient-to-br from-black/70 to-gray-900/70 text-white px-4 py-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-10 tracking-tight">
          Rick y Morty
        </h1>

        {/* Buscador + Filtros */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <Input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar personaje..."
            className="w-full max-w-md text-black"
          />
          <select
            className="text-black px-4 py-2 rounded-md"
            value={species}
            onChange={(e) => {
              setSpecies(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas las razas</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alien</option>
            <option value="Robot">Robot</option>
            <option value="Animal">Animal</option>
            <option value="Mythological Creature">Criatura Mitológica</option>
            <option value="Disease">Enfermedad</option>
          </select>
          <select
            className="text-black px-4 py-2 rounded-md"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los estados</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Resultados */}
        {loading ? (
          <p className="text-center text-xl">Cargando personajes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {characters.map((char) => (
              <Card
                key={char.id}
                className="bg-gray-800 hover:scale-105 hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-green-500/30 animate-fade-in"
              >
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={char.image}
                    alt={char.name}
                      onClick={playSound}
                      className="bg-white/10 backdrop-blur-md rounded-xl border border-green-400 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl animate-fade-in"
                  />
                  <h2 className="text-xl font-semibold text-center">{char.name}</h2>
                  <p className="text-sm text-gray-400">{char.species}</p>
                  <p className="text-sm text-gray-400">{char.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Navegación */}
        <div className="flex justify-center gap-4 mt-10">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Anterior
          </Button>
          <span className="text-lg font-semibold">Página {page}</span>
          <Button onClick={() => setPage((p) => p + 1)} disabled={!hasNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
}
