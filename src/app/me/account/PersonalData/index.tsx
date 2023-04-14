import { Form } from '@/components/Form'
import { Button } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const updatePersonalDataSchema = z.object({
  username: z.string().min(3, 'Mínimo de 3 caracteres'),
  document: z.string().min(11, 'Mínimo de 11 caracteres'),
  birthDate: z.string().min(10, 'Mínimo de 10 caracteres'),
  fisrtname: z.string().min(3, 'Mínimo de 3 caracteres'),
  surname: z.string().min(3, 'Mínimo de 3 caracteres'),
  address: z.string().min(3, 'Mínimo de 3 caracteres'),
  number: z.string().min(1, 'Mínimo de 1 caracteres'),
  complement: z.string().min(3, 'Mínimo de 3 caracteres'),
  district: z.string().min(3, 'Mínimo de 3 caracteres'),
  city: z.string().min(3, 'Mínimo de 3 caracteres'),
  state: z.string().min(2, 'Mínimo de 2 caracteres'),
  zipCode: z.string().min(8, 'Mínimo de 8 caracteres'),
  phone: z.string().min(11, 'Mínimo de 11 caracteres'),
  email: z.string().email('E-mail inválido'),
})

type UpdatePersonalDataFormData = z.infer<typeof updatePersonalDataSchema>

export function PersonalData() {
  const [isEditing, setIsEditing] = useState(false)

  const updatePersonalDataForm = useForm<UpdatePersonalDataFormData>({
    resolver: zodResolver(updatePersonalDataSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updatePersonalDataForm

  async function updatePersonalData(data: UpdatePersonalDataFormData) {
    console.log(data)
  }

  return (
    <div>
      <p className="font-bold pb-3 pt-5">Dados Pessoais</p>
      <FormProvider {...updatePersonalDataForm}>
        <form onSubmit={handleSubmit(updatePersonalData)}>
          <div className="grid grid-cols-3 space-x-5">
            <Form.Field>
              <Form.Label>Nome de usuário</Form.Label>
              <Form.Input disabled={!isEditing} name="username" />
            </Form.Field>
            <Form.Field>
              <Form.Label>CPF</Form.Label>
              <Form.Input disabled name="document" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Input disabled name="birthDate" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Nome</Form.Label>
              <Form.Input disabled={!isEditing} name="fisrtname" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Sobrenome</Form.Label>
              <Form.Input disabled={!isEditing} name="surname" />
            </Form.Field>
          </div>
          <p className="font-bold pb-3 pt-5">Endereço</p>
          <div className="grid grid-cols-3 space-x-5">
            <Form.Field>
              <Form.Label>CEP</Form.Label>
              <Form.Input disabled={!isEditing} name="zipcode" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Logradouro</Form.Label>
              <Form.Input disabled name="street" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Número</Form.Label>
              <Form.Input disabled={!isEditing} name="numberAddress" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Complemento</Form.Label>
              <Form.Input disabled={!isEditing} name="complement" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Bairro</Form.Label>
              <Form.Input disabled name="neighborhood" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Cidade</Form.Label>
              <Form.Input disabled name="city" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Estado</Form.Label>
              <Form.Input disabled name="state" />
            </Form.Field>
            <Form.Field>
              <Form.Label>País</Form.Label>
              <Form.Input disabled name="country" />
            </Form.Field>
          </div>
          <p className="font-bold pb-3 pt-5">Contato</p>
          <div className="grid grid-cols-3 space-x-5">
            <Form.Field>
              <Form.Label className="font-medium">Telefone</Form.Label>
              <Form.Input disabled={!isEditing} name="phone" />
            </Form.Field>
            <Form.Field>
              <Form.Label>E-mail</Form.Label>
              <Form.Input disabled={!isEditing} name="email" />
            </Form.Field>
          </div>

          <div className="text-center py-5">
            {isEditing ? (
              <div className="space-x-3">
                <Button
                  type="button"
                  colorScheme="red"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                >
                  Salvar alterações
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                colorScheme="orange"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
