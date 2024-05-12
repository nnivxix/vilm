import { ChangeEvent, FormEvent } from "react"


export default function Setting() {
  const [form, setForm] = useState<{
    token?: string
  }>({
    token: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    console.log(form)
  }
  return (
    <div className="max-w-4xl mx-auto">

      <form onSubmit={submitForm} className="grid grid-cols-1 gap-2 px-4">
        <div>
          <h1 className="text-xl">
            Settings
          </h1>
          <p className="text-gray-500" >Here you can manage your setting.</p>
        </div>

        <div>
          <Label htmlFor="token">API Token</Label>
          <Input placeholder="eyJshghsgfshhffsyery.xaaad..." value={form.token} id="token" onChange={handleChange} name="token" />
          <Link to={"https://developer.themoviedb.org/docs/getting-started"} target="_blank" className="underline">How to get API Token</Link>
        </div>

        <div>
          <Button className="font-semibold">Update</Button>
        </div>
      </form>
    </div>
  )
}
