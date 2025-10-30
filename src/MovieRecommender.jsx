import React, { useState, useEffect } from 'react';
import { Film, Search, Star, TrendingUp, Sparkles } from 'lucide-react';

const MovieRecommender = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const movieDatabase = [
  { id: 1, title: "The Dark Knight", genres: ["Action","Crime","Drama"], rating: 9.0, year: 2008, director: "Christopher Nolan", keywords: ["superhero","vigilante","joker","chaos"] },
  { id: 2, title: "Inception", genres: ["Action","Sci-Fi","Thriller"], rating: 8.8, year: 2010, director: "Christopher Nolan", keywords: ["dream","heist","mind-bending","subconscious"] },
  { id: 3, title: "Interstellar", genres: ["Adventure","Drama","Sci-Fi"], rating: 8.6, year: 2014, director: "Christopher Nolan", keywords: ["space","time","family","survival"] },
  { id: 4, title: "The Prestige", genres: ["Drama","Mystery","Thriller"], rating: 8.5, year: 2006, director: "Christopher Nolan", keywords: ["magic","rivalry","twist","obsession"] },
  { id: 5, title: "Memento", genres: ["Mystery","Thriller"], rating: 8.4, year: 2000, director: "Christopher Nolan", keywords: ["memory","nonlinear","revenge","identity"] },
  { id: 6, title: "The Matrix", genres: ["Action","Sci-Fi"], rating: 8.7, year: 1999, director: "Lana Wachowski", keywords: ["simulation","ai","reality","hack"] },
  { id: 7, title: "The Matrix Reloaded", genres: ["Action","Sci-Fi"], rating: 7.2, year: 2003, director: "Lana Wachowski", keywords: ["matrix","conflict","zion","agents"] },
  { id: 8, title: "The Matrix Revolutions", genres: ["Action","Sci-Fi"], rating: 6.8, year: 2003, director: "Lana Wachowski", keywords: ["battle","savior","zion","conclusion"] },
  { id: 9, title: "The Shawshank Redemption", genres: ["Drama"], rating: 9.3, year: 1994, director: "Frank Darabont", keywords: ["prison","hope","friendship","escape"] },
  { id: 10, title: "The Godfather", genres: ["Crime","Drama"], rating: 9.2, year: 1972, director: "Francis Ford Coppola", keywords: ["mafia","family","power","crime"] },
  { id: 11, title: "The Godfather Part II", genres: ["Crime","Drama"], rating: 9.0, year: 1974, director: "Francis Ford Coppola", keywords: ["mafia","origin","betrayal","empire"] },
  { id: 12, title: "Pulp Fiction", genres: ["Crime","Drama"], rating: 8.9, year: 1994, director: "Quentin Tarantino", keywords: ["nonlinear","hitman","dialogue","crime"] },
  { id: 13, title: "Reservoir Dogs", genres: ["Crime","Drama","Thriller"], rating: 8.3, year: 1992, director: "Quentin Tarantino", keywords: ["heist","doublecross","dialogue","violence"] },
  { id: 14, title: "Fight Club", genres: ["Drama"], rating: 8.8, year: 1999, director: "David Fincher", keywords: ["identity","anarchy","twist","underground"] },
  { id: 15, title: "Se7en", genres: ["Crime","Drama","Thriller"], rating: 8.6, year: 1995, director: "David Fincher", keywords: ["serial killer","sin","detective","dark"] },
  { id: 16, title: "Gone Girl", genres: ["Drama","Mystery","Thriller"], rating: 8.1, year: 2014, director: "David Fincher", keywords: ["missing","media","marriage","twist"] },
  { id: 17, title: "The Social Network", genres: ["Drama"], rating: 7.7, year: 2010, director: "David Fincher", keywords: ["facebook","startup","lawsuit","genius"] },
  { id: 18, title: "Gladiator", genres: ["Action","Adventure","Drama"], rating: 8.5, year: 2000, director: "Ridley Scott", keywords: ["rome","revenge","arena","general"] },
  { id: 19, title: "Blade Runner 2049", genres: ["Sci-Fi","Thriller"], rating: 8.0, year: 2017, director: "Denis Villeneuve", keywords: ["replicant","dystopia","investigation","future"] },
  { id: 20, title: "Arrival", genres: ["Drama","Sci-Fi"], rating: 7.9, year: 2016, director: "Denis Villeneuve", keywords: ["language","aliens","time","communication"] },
  { id: 21, title: "Dune", genres: ["Adventure","Sci-Fi"], rating: 8.0, year: 2021, director: "Denis Villeneuve", keywords: ["desert","politics","spice","prophecy"] },
  { id: 22, title: "The Martian", genres: ["Adventure","Drama","Sci-Fi"], rating: 8.0, year: 2015, director: "Ridley Scott", keywords: ["mars","survival","science","isolation"] },
  { id: 23, title: "Gravity", genres: ["Drama","Sci-Fi","Thriller"], rating: 7.7, year: 2013, director: "Alfonso Cuarón", keywords: ["space","survival","debris","alone"] },
  { id: 24, title: "Children of Men", genres: ["Drama","Sci-Fi","Thriller"], rating: 7.9, year: 2006, director: "Alfonso Cuarón", keywords: ["dystopia","fertility","chaos","refugee"] },
  { id: 25, title: "Roma", genres: ["Drama"], rating: 7.7, year: 2018, director: "Alfonso Cuarón", keywords: ["slice of life","family","mexico","nostalgia"] },
  { id: 26, title: "La La Land", genres: ["Comedy","Drama","Romance"], rating: 8.0, year: 2016, director: "Damien Chazelle", keywords: ["music","romance","dreams","jazz"] },
  { id: 27, title: "Whiplash", genres: ["Drama","Music"], rating: 8.5, year: 2014, director: "Damien Chazelle", keywords: ["drums","mentor","obsession","music"] },
  { id: 28, title: "The Social Network", genres: ["Drama"], rating: 7.7, year: 2010, director: "David Fincher", keywords: ["facebook","startup","lawsuit","genius"] },
  { id: 29, title: "Titanic", genres: ["Drama","Romance"], rating: 7.9, year: 1997, director: "James Cameron", keywords: ["ship","love","disaster","class"] },
  { id: 30, title: "Avatar", genres: ["Action","Adventure","Sci-Fi"], rating: 7.8, year: 2009, director: "James Cameron", keywords: ["pandora","alien","ecology","soldier"] },
  { id: 31, title: "Aliens", genres: ["Action","Sci-Fi","Thriller"], rating: 8.4, year: 1986, director: "James Cameron", keywords: ["xenomorph","colonial marines","rescue","horror"] },
  { id: 32, title: "Terminator 2: Judgment Day", genres: ["Action","Sci-Fi"], rating: 8.5, year: 1991, director: "James Cameron", keywords: ["robot","time travel","protector","explosive"] },
  { id: 33, title: "Top Gun: Maverick", genres: ["Action","Drama"], rating: 8.3, year: 2022, director: "Joseph Kosinski", keywords: ["fighter","aircraft","mentor","team"] },
  { id: 34, title: "Mad Max: Fury Road", genres: ["Action","Adventure","Sci-Fi"], rating: 8.1, year: 2015, director: "George Miller", keywords: ["post-apocalyptic","chase","survival","warrior"] },
  { id: 35, title: "The Revenant", genres: ["Action","Adventure","Drama"], rating: 8.0, year: 2015, director: "Alejandro G. Iñárritu", keywords: ["survival","revenge","wilderness","bear"] },
  { id: 36, title: "Birdman", genres: ["Comedy","Drama"], rating: 7.7, year: 2014, director: "Alejandro G. Iñárritu", keywords: ["theatre","ego","one-shot","comeback"] },
  { id: 37, title: "No Country for Old Men", genres: ["Crime","Drama","Thriller"], rating: 8.2, year: 2007, director: "Joel Coen", keywords: ["cat-and-mouse","hitman","desert","fate"] },
  { id: 38, title: "Fargo", genres: ["Crime","Drama","Thriller"], rating: 8.1, year: 1996, director: "Joel Coen", keywords: ["crime","dark comedy","snow","investigation"] },
  { id: 39, title: "The Big Lebowski", genres: ["Comedy","Crime"], rating: 8.1, year: 1998, director: "Joel Coen", keywords: ["bowling","mistaken identity","humor","cult"] },
  { id: 40, title: "The Grand Budapest Hotel", genres: ["Comedy","Drama"], rating: 8.1, year: 2014, director: "Wes Anderson", keywords: ["hotel","quirky","aesthetic","ensemble"] },
  { id: 41, title: "Moonrise Kingdom", genres: ["Comedy","Drama","Romance"], rating: 7.8, year: 2012, director: "Wes Anderson", keywords: ["young love","island","adventure","quirky"] },
  { id: 42, title: "The Royal Tenenbaums", genres: ["Comedy","Drama"], rating: 7.6, year: 2001, director: "Wes Anderson", keywords: ["family","dysfunction","quirky","legacy"] },
  { id: 43, title: "Spirited Away", genres: ["Animation","Adventure","Family"], rating: 8.6, year: 2001, director: "Hayao Miyazaki", keywords: ["spirits","coming-of-age","bathhouse","fantasy"] },
  { id: 44, title: "My Neighbor Totoro", genres: ["Animation","Family","Fantasy"], rating: 8.2, year: 1988, director: "Hayao Miyazaki", keywords: ["forest","spirits","family","innocence"] },
  { id: 45, title: "Princess Mononoke", genres: ["Animation","Action","Adventure"], rating: 8.4, year: 1997, director: "Hayao Miyazaki", keywords: ["forest","conflict","spirits","myth"] },
  { id: 46, title: "Toy Story", genres: ["Animation","Adventure","Comedy"], rating: 8.3, year: 1995, director: "John Lasseter", keywords: ["toys","friendship","adventure","childhood"] },
  { id: 47, title: "Toy Story 3", genres: ["Animation","Adventure","Comedy"], rating: 8.2, year: 2010, director: "Lee Unkrich", keywords: ["farewell","toys","growing up","home"] },
  { id: 48, title: "Coco", genres: ["Animation","Adventure","Family"], rating: 8.4, year: 2017, director: "Lee Unkrich", keywords: ["music","afterlife","family","mexico"] },
  { id: 49, title: "Up", genres: ["Animation","Adventure","Comedy"], rating: 8.2, year: 2009, director: "Pete Docter", keywords: ["balloons","adventure","loss","friendship"] },
  { id: 50, title: "WALL·E", genres: ["Animation","Adventure","Family"], rating: 8.4, year: 2008, director: "Andrew Stanton", keywords: ["robot","environment","love","future"] },
  { id: 51, title: "Forrest Gump", genres: ["Drama","Romance"], rating: 8.8, year: 1994, director: "Robert Zemeckis", keywords: ["life journey","history","innocence","love"] },
  { id: 52, title: "Cast Away", genres: ["Adventure","Drama"], rating: 7.8, year: 2000, director: "Robert Zemeckis", keywords: ["island","survival","isolation","rescue"] },
  { id: 53, title: "Back to the Future", genres: ["Adventure","Comedy","Sci-Fi"], rating: 8.5, year: 1985, director: "Robert Zemeckis", keywords: ["time travel","80s","past","adventure"] },
  { id: 54, title: "The Silence of the Lambs", genres: ["Crime","Drama","Thriller"], rating: 8.6, year: 1991, director: "Jonathan Demme", keywords: ["serial killer","fbi","psychology","dark"] },
  { id: 55, title: "The Sixth Sense", genres: ["Drama","Mystery","Thriller"], rating: 8.1, year: 1999, director: "M. Night Shyamalan", keywords: ["ghosts","twist","child","psychic"] },
  { id: 56, title: "Unbreakable", genres: ["Drama","Mystery","Sci-Fi"], rating: 7.3, year: 2000, director: "M. Night Shyamalan", keywords: ["superhero","comic","mystery","identity"] },
  { id: 57, title: "Her", genres: ["Drama","Romance","Sci-Fi"], rating: 8.0, year: 2013, director: "Spike Jonze", keywords: ["ai","relationship","loneliness","future"] },
  { id: 58, title: "Eternal Sunshine of the Spotless Mind", genres: ["Drama","Romance","Sci-Fi"], rating: 8.3, year: 2004, director: "Michel Gondry", keywords: ["memory","love","erasure","dreamlike"] },
  { id: 59, title: "Amélie", genres: ["Comedy","Romance"], rating: 8.3, year: 2001, director: "Jean-Pierre Jeunet", keywords: ["whimsical","paris","romance","quirky"] },
  { id: 60, title: "The Departed", genres: ["Crime","Drama","Thriller"], rating: 8.5, year: 2006, director: "Martin Scorsese", keywords: ["undercover","mafia","betrayal","police"] },
  { id: 61, title: "Goodfellas", genres: ["Crime","Drama"], rating: 8.7, year: 1990, director: "Martin Scorsese", keywords: ["mafia","rise and fall","crime","loyalty"] },
  { id: 62, title: "Taxi Driver", genres: ["Crime","Drama"], rating: 8.3, year: 1976, director: "Martin Scorsese", keywords: ["isolation","vigilante","nyc","dark"] },
  { id: 63, title: "Raging Bull", genres: ["Biography","Drama","Sport"], rating: 8.2, year: 1980, director: "Martin Scorsese", keywords: ["boxer","biopic","violence","redemption"] },
  { id: 64, title: "Joker", genres: ["Crime","Drama","Thriller"], rating: 8.5, year: 2019, director: "Todd Phillips", keywords: ["comedy turned dark","origin","society","mental illness"] },
  { id: 65, title: "Parasite", genres: ["Comedy","Drama","Thriller"], rating: 8.6, year: 2019, director: "Bong Joon-ho", keywords: ["class","satire","household","infiltration"] },
  { id: 66, title: "Memories of Murder", genres: ["Crime","Drama","Mystery"], rating: 8.1, year: 2003, director: "Bong Joon-ho", keywords: ["serial killer","investigation","korea","dark"] },
  { id: 67, title: "Oldboy", genres: ["Action","Drama","Mystery"], rating: 8.4, year: 2003, director: "Park Chan-wook", keywords: ["revenge","imprisonment","twist","violence"] },
  { id: 68, title: "The Handmaiden", genres: ["Drama","Romance","Thriller"], rating: 8.1, year: 2016, director: "Park Chan-wook", keywords: ["conspiracy","romance","manipulation","twist"] },
  { id: 69, title: "Pan's Labyrinth", genres: ["Drama","Fantasy","War"], rating: 8.2, year: 2006, director: "Guillermo del Toro", keywords: ["fantasy","gothic","childhood","war"] },
  { id: 70, title: "The Shape of Water", genres: ["Adventure","Drama","Fantasy"], rating: 7.3, year: 2017, director: "Guillermo del Toro", keywords: ["monster","love","cold war","underwater"] },
  { id: 71, title: "The Lord of the Rings: The Fellowship of the Ring", genres: ["Adventure","Drama","Fantasy"], rating: 8.8, year: 2001, director: "Peter Jackson", keywords: ["middle-earth","ring","quest","fellowship"] },
  { id: 72, title: "The Lord of the Rings: The Two Towers", genres: ["Adventure","Drama","Fantasy"], rating: 8.7, year: 2002, director: "Peter Jackson", keywords: ["battle","ent","gondor","journey"] },
  { id: 73, title: "The Lord of the Rings: The Return of the King", genres: ["Adventure","Drama","Fantasy"], rating: 8.9, year: 2003, director: "Peter Jackson", keywords: ["war","ring","courage","finale"] },
  { id: 74, title: "The Hobbit: An Unexpected Journey", genres: ["Adventure","Fantasy"], rating: 7.8, year: 2012, director: "Peter Jackson", keywords: ["hobbit","adventure","dragon","quest"] },
  { id: 75, title: "The Hobbit: The Desolation of Smaug", genres: ["Adventure","Fantasy"], rating: 7.8, year: 2013, director: "Peter Jackson", keywords: ["smaug","forest","bard","escape"] },
  { id: 76, title: "The Hobbit: The Battle of the Five Armies", genres: ["Adventure","Fantasy"], rating: 7.4, year: 2014, director: "Peter Jackson", keywords: ["battle","armies","dragon","conclusion"] },
  { id: 77, title: "Slumdog Millionaire", genres: ["Drama","Romance"], rating: 8.0, year: 2008, director: "Danny Boyle", keywords: ["india","game show","destiny","love"] },
  { id: 78, title: "Trainspotting", genres: ["Drama"], rating: 8.2, year: 1996, director: "Danny Boyle", keywords: ["addiction","youth","edgy","scotland"] },
  { id: 79, title: "127 Hours", genres: ["Biography","Drama"], rating: 7.6, year: 2010, director: "Danny Boyle", keywords: ["survival","arm","canyon","escape"] },
  { id: 80, title: "Slither", genres: ["Comedy","Horror","Sci-Fi"], rating: 6.5, year: 2006, director: "James Gunn", keywords: ["alien","plague","small town","humor"] },
  { id: 81, title: "Guardians of the Galaxy", genres: ["Action","Adventure","Sci-Fi"], rating: 8.0, year: 2014, director: "James Gunn", keywords: ["space","team","humor","music"] },
  { id: 82, title: "Black Panther", genres: ["Action","Adventure","Sci-Fi"], rating: 7.3, year: 2018, director: "Ryan Coogler", keywords: ["wakanda","king","vibranium","identity"] },
  { id: 83, title: "Logan", genres: ["Action","Drama","Sci-Fi"], rating: 8.1, year: 2017, director: "James Mangold", keywords: ["x-men","old","redemption","violence"] },
  { id: 84, title: "Deadpool", genres: ["Action","Comedy"], rating: 8.0, year: 2016, director: "Tim Miller", keywords: ["meta","antihero","humor","violence"] },
  { id: 85, title: "Spider-Man: Into the Spider-Verse", genres: ["Animation","Action","Adventure"], rating: 8.4, year: 2018, director: "Bob Persichetti", keywords: ["multiverse","animation","spider-people","comic"] },
  { id: 86, title: "Spider-Man: No Way Home", genres: ["Action","Adventure","Sci-Fi"], rating: 8.2, year: 2021, director: "Jon Watts", keywords: ["multiverse","spider-man","cameos","action"] },
  { id: 87, title: "A Beautiful Mind", genres: ["Biography","Drama"], rating: 8.2, year: 2001, director: "Ron Howard", keywords: ["math","schizophrenia","genius","marriage"] },
  { id: 88, title: "Apollo 13", genres: ["Adventure","Drama","History"], rating: 7.6, year: 1995, director: "Ron Howard", keywords: ["space","rescue","nasa","real events"] },
  { id: 89, title: "The Imitation Game", genres: ["Biography","Drama","Thriller"], rating: 8.0, year: 2014, director: "Morten Tyldum", keywords: ["turing","enigma","ww2","codebreaking"] },
  { id: 90, title: "The King's Speech", genres: ["Biography","Drama","History"], rating: 8.0, year: 2010, director: "Tom Hooper", keywords: ["speech","therapy","king","ww2"] },
  { id: 91, title: "Schindler's List", genres: ["Biography","Drama","History"], rating: 8.9, year: 1993, director: "Steven Spielberg", keywords: ["holocaust","war","rescue","true story"] },
  { id: 92, title: "Saving Private Ryan", genres: ["Drama","War"], rating: 8.6, year: 1998, director: "Steven Spielberg", keywords: ["ww2","beach","soldiers","rescue"] },
  { id: 93, title: "Jurassic Park", genres: ["Action","Adventure","Sci-Fi"], rating: 8.1, year: 1993, director: "Steven Spielberg", keywords: ["dinosaurs","park","chaos","island"] },
  { id: 94, title: "E.T. the Extra-Terrestrial", genres: ["Family","Sci-Fi"], rating: 7.8, year: 1982, director: "Steven Spielberg", keywords: ["alien","friendship","childhood","home"] },
  { id: 95, title: "The Truman Show", genres: ["Comedy","Drama","Sci-Fi"], rating: 8.1, year: 1998, director: "Peter Weir", keywords: ["reality","tv","freedom","identity"] },
  { id: 96, title: "The Social Dilemma", genres: ["Documentary"], rating: 7.2, year: 2020, director: "Jeff Orlowski", keywords: ["social media","algorithms","privacy","influence"] },
  { id: 97, title: "The Wolf of Wall Street", genres: ["Biography","Comedy","Crime"], rating: 8.2, year: 2013, director: "Martin Scorsese", keywords: ["finance","excess","fraud","party"] },
  { id: 98, title: "Blade Runner", genres: ["Sci-Fi","Thriller"], rating: 8.1, year: 1982, director: "Ridley Scott", keywords: ["replicant","dystopia","noir","future"] },
  { id: 99, title: "Sin City", genres: ["Crime","Thriller"], rating: 8.0, year: 2005, director: "Frank Miller", keywords: ["neo-noir","comic","stylized","violence"] },
  { id: 100, title: "Heat", genres: ["Crime","Drama","Thriller"], rating: 8.2, year: 1995, director: "Michael Mann", keywords: ["heist","cop","cat-and-mouse","noir"] }
];

  useEffect(() => {
    setMovies(movieDatabase);
  }, []);

  const calculateCosineSimilarity = (movie1, movie2) => {
    const allGenres = [...new Set([...movie1.genres, ...movie2.genres])];
    const allKeywords = [...new Set([...movie1.keywords, ...movie2.keywords])];
    
    const genreVector1 = allGenres.map(g => movie1.genres.includes(g) ? 1 : 0);
    const genreVector2 = allGenres.map(g => movie2.genres.includes(g) ? 1 : 0);
    
    const keywordVector1 = allKeywords.map(k => movie1.keywords.includes(k) ? 1 : 0);
    const keywordVector2 = allKeywords.map(k => movie2.keywords.includes(k) ? 1 : 0);
    
    const directorSim = movie1.director === movie2.director ? 1 : 0;
    
    const vector1 = [...genreVector1.map(v => v * 0.4), ...keywordVector1.map(v => v * 0.5), directorSim * 0.1];
    const vector2 = [...genreVector2.map(v => v * 0.4), ...keywordVector2.map(v => v * 0.5), directorSim * 0.1];
    
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
    
    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
  };

  const getRecommendations = (movie) => {
    setLoading(true);
    setTimeout(() => {
      const similarities = movies
        .filter(m => m.id !== movie.id)
        .map(m => ({
          ...m,
          similarity: calculateCosineSimilarity(movie, m)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);
      
      setRecommendations(similarities);
      setLoading(false);
    }, 500);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    getRecommendations(movie);
    setSearchTerm('');
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-300" />
            <h1 className="text-5xl font-bold text-white">Movie Recommender</h1>
            <Sparkles className="w-12 h-12 text-purple-300" />
          </div>
          <p className="text-purple-200 text-lg">Content-Based Filtering using Cosine Similarity</p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {searchTerm && (
            <div className="mt-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 max-h-64 overflow-y-auto">
              {filteredMovies.map(movie => (
                <button
                  key={movie.id}
                  onClick={() => handleMovieSelect(movie)}
                  className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors text-white border-b border-white/10 last:border-0"
                >
                  <div className="font-semibold">{movie.title}</div>
                  <div className="text-sm text-purple-200">{movie.year} • {movie.genres.join(', ')}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedMovie && (
          <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Selected Movie
            </h2>
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedMovie.title}</h3>
              <div className="flex flex-wrap gap-4 text-purple-200 mb-3">
                <span>{selectedMovie.year}</span>
                <span>•</span>
                <span>Director: {selectedMovie.director}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {selectedMovie.rating}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedMovie.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-white">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.keywords.map(keyword => (
                  <span key={keyword} className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-purple-200">
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-white text-xl">Calculating recommendations...</div>
        ) : recommendations.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              Recommended For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((movie, index) => (
                <div
                  key={movie.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-purple-400 transition-all hover:transform hover:scale-105 cursor-pointer"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="text-purple-200 text-sm mb-3">
                    {movie.year} • {movie.director}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">{movie.rating}</span>
                    <span className="ml-auto text-purple-300 text-sm">
                      {(movie.similarity * 100).toFixed(1)}% match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genres.map(genre => (
                      <span key={genre} className="px-2 py-1 bg-purple-500/30 rounded text-xs text-white">
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${movie.similarity * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedMovie && (
          <div className="text-center text-purple-200 mt-12">
            <p className="text-xl mb-4">Search and select a movie to get personalized recommendations!</p>
            <p className="text-sm">Our algorithm uses cosine similarity to find movies with similar genres, keywords, and directors.</p>
          </div>
        )}

        <div className="mt-16 text-center text-purple-300 text-sm">
          <p>Built with Content-Based Filtering • Cosine Similarity Algorithm</p>
          <p className="mt-2">Machine Learning Project</p>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommender;