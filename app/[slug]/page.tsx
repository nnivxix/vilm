interface Params {
  params: { slug: string }
}

export default function page({ params }: Params) {
  return (
    <div>My Post: {params.slug}</div>
  )
}