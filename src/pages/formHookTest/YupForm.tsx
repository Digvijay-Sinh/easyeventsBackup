import React from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
});

type FormData = {
  email: string;
  username: string;
};
const FormHook = () => {
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const {
    errors,
    dirtyFields,
    touchedFields,
    isValid,
    isDirty,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
  } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "address",
    control,
  });

  const onError = (errors: FieldErrors<FormData>) => {
    console.log("=============errors===============");
    console.log(errors);
    console.log("=============errors================");
  };

  const username = watch("username");
  const submithandler = (data: FormData) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submithandler, onError)} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="username">Username : {username}</label>
          <input type="username" id="username" {...register("username")} />
          <p className="text-red-600">{errors.username?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormHook;
