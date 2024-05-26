export default function NotFound() {
  useHead({
    title: 'Vilm - Not Found Page',
    meta: {
      description: 'Opp\'s,  the page is not found .'
    }
  });
  return <div className="text-white">Not Found</div>;
}
