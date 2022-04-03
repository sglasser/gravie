import Home from './Home.svelte';
import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

test('it works', () => {
  const { getByText } = render(Home)

  const title = getByText('Game Search');

  expect(title).toBeInTheDocument();
})