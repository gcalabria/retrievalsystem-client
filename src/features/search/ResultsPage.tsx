import { useState } from 'react';

import { Box } from '@mui/material';

interface Results {
  id: number;
  author: string;
  title: string;
  body: string;
}

const initialResults: Results[] = [
  {
    id: 1,
    author: 'John Doe',
    title: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eu ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies',
  },
  {
    id: 2,
    author: 'Bob Doe',
    title: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eu ultricies aliquam, nunc nisl ultricies nunc, vitae ultricies',
  },
];

function ResultsPage() {
  const [results] = useState<Results[]>(initialResults);

  return (
    <Box>
      {results.map((r) => (
        <Box key={r.id}>
          <Box>
            <Box>{r.author}</Box>
            <Box>{r.title}</Box>
          </Box>
          <Box>{r.body}</Box>
        </Box>
      ))}
    </Box>
  );
}

export default ResultsPage;
