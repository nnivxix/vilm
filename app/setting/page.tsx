"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { Clipboard } from "lucide-react";
import $localStorage from "@/utils/$local-storage";
import { useToast } from "@/components/ui/use-toast";
import useHead from "@/hooks/useHead";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Account, useAccountStore } from "@/stores/account";
import $fetch from "@/utils/$fetch";

export default function Page() {
  const { item: token, setItem, removeItem } = $localStorage("token");
  const [form, setForm] = useState<{
    token?: string | null
  }>({
    token
  })
  const { toast } = useToast();
  const { setAccount, setIsAuthenticated } = useAccountStore();

  const handleClipboard = async () => {
    const copiedText = await navigator.clipboard.readText();

    setForm((prevFormData) => ({ ...prevFormData, token: copiedText }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (token === form.token) return;

    toast({
      title: "Success",
      description: "Data updated succesfully."
    })

    try {
      const { error } = await $fetch<Account>("/authentication", {
        headers: {
          Authorization: "Bearer " + form.token,
        },
        defaultToken: false,
      });



      if (!form.token) {
        removeItem();
        toast({
          title: "Success",
          description: "Data updated succesfully to be null."
        })
        setAccount(null);
        setIsAuthenticated(false);

        return;
      }

      if (!error) {
        setItem(form.token);
        toast({
          title: "Success",
          description: "Data updated succesfully."
        })
        const { data } = await $fetch<Account>("/account", {
          headers: {
            Authorization: "Bearer " + form.token,
          },
          defaultToken: false,
        });

        setAccount(data);

        setIsAuthenticated(true);
        return;
      }

      toast({
        title: "Error",
        description: error?.status_message,
      })
      throw new Error(error?.status_message)



    } catch (error) {
      console.error(error)
    }
  }


  useHead({
    title: 'Vilm - Settings',
    meta: {
      description: 'Here you can manage your settings'
    }
  });

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
          <Input placeholder="eyJshghsgfshhffsyery.xaaad..." value={form.token!} id="token" onChange={handleChange} name="token" />
          <Link href={"https://developer.themoviedb.org/docs/getting-started"} target="_blank" className="underline">How to get API Token</Link>
          <p className="text-gray-500" >Don't worry, we won't store your API token to our server (Vilm), we'll store the token to LocalStorage.</p>
        </div>

        <div>
          <Button className="font-semibold">Update</Button>
        </div>
      </form>
    </div>
  )
}
