interface Params {
  params: { id: string }
}
export default function Page({ params }: Params) {
  return (
    <div>
      id: {params.id}
    </div>
  )
}
