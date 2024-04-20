create policy "Acceso para todos los usarios registrados"
on public.productsExt
to authenticated
using (true);