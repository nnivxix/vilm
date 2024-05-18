import { ChangeEvent, FormEvent } from "react"
import { Clipboard } from "lucide-react";

export default function Setting() {
  const { item: token, setItem, removeItem } = $localStorage("token");
  const [form, setForm] = useState<{
    token: string
  }>({
    token
  })
  const { toast } = useToast();
  const { setAccount } = useAccount()

  const handleClipboard = async () => {
    const copiedText = await navigator.clipboard.readText();

    setForm((prevFormData) => ({ ...prevFormData, token: copiedText }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const auth = await $fetch<Response>("/authentication", {
        headers: {
          Authorization: "Bearer " + form.token,
        },
        defaultToken: false,
      });
      const data = await auth.json();


      if (!form.token) {
        removeItem();
        toast({
          title: "Success",
          description: "Data updated succesfully."
        })
        setAccount(null);
        return;
      }

      if (auth.ok) {
        setItem(form.token);
        toast({
          title: "Success",
          description: "Data updated succesfully."
        })
        const response = await $fetch<Response>("/account", {
          headers: {
            Authorization: "Bearer " + form.token,
          },
          defaultToken: false,
        });

        const data = await response.json();
        setAccount(data);

        return;
      }

      toast({
        title: "Error",
        description: data.status_message
      })
      throw new Error(data)



    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <form onSubmit={submitForm} className="grid grid-cols-1 gap-5 px-4">
        <div>
          <h1 className="text-xl">
            Settings
          </h1>
          <p className="text-gray-500" >Here you can manage your setting.</p>
        </div>

        <div className="relative">
          <Label htmlFor="token">API Token</Label>
          <Clipboard className="absolute right-2 top-9 bg-slate-900" size={16} onClick={handleClipboard} />
          <Input placeholder="eyJshghsgfshhffsyery.xaaad..." value={form.token} id="token" onChange={handleChange} name="token" />
          <Link to={"https://developer.themoviedb.org/docs/getting-started"} target="_blank" className="underline">How to get API Token</Link>
          <p className="text-gray-500" >Don't worry, we won't store your API token to our server (Vilm), we just save the token to Local Storage.</p>
        </div>

        <div>
          <Button className="font-semibold">Update</Button>
        </div>
      </form>
    </div>
  )
}
