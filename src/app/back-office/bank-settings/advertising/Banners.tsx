import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Divider } from '@chakra-ui/react'
import { Form } from '@/components/Form'

interface BannersProps {
  banners: {
    image: string
    link: string
  }[]
}

const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3mb
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const createBannerSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine((files) => !!files.item(0), 'A imagem de perfil é obrigatória')
    .refine(
      (files) => files.item(0)!.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
      'Formato de imagem inválido',
    )
    .transform((files) => {
      return files.item(0)!
    }),
})

type CreateBannerFormData = z.infer<typeof createBannerSchema>

export function BannersManagement({ banners }: BannersProps) {
  const createBannerForm = useForm<CreateBannerFormData>({
    resolver: zodResolver(createBannerSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createBannerForm

  async function createBanner(data: CreateBannerFormData) {
    console.log(data)
  }

  return (
    <div className="space-y-5">
      <div>
        <FormProvider {...createBannerForm}>
          <form
            className="flex justify-center items-center"
            onSubmit={handleSubmit(createBanner)}
          >
            <Form.Field className="flex-1">
              <Form.Label>Selecionar imagem</Form.Label>
              <Form.Input type="file" name="image" />
              <Form.ErrorMessage field="image" />
            </Form.Field>
            <Form.Field className="flex-1">
              <Form.Label>Link</Form.Label>
              <Form.Input name="link" />
            </Form.Field>
            <Form.Field>
              <Button
                mt="5"
                colorScheme="green"
                type="submit"
                size="lg"
                isLoading={isSubmitting}
              >
                Adicionar
              </Button>
            </Form.Field>
          </form>
        </FormProvider>
      </div>
      <Divider />
      <div>
        <p>Espaço para editar banners</p>
        {banners &&
          banners.map((banner) => (
            <div key={banner.image}>
              <div className="flex">
                <img src={banner.image} alt="banner" />
                <div>TrachIcon - to exclude banner</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
