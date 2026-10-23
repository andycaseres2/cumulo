-- Topic slugs and the mission ids built from them moved from Spanish to English.
-- Renames the saved progress so nothing is lost. Safe to run more than once. Until it runs, the site
-- already reads the old ids as the new ones; this only cleans up the stored rows.
-- One DO block, so it runs as a single statement (the Supabase SQL Editor does not keep temporary
-- tables between statements).

do $migration$
begin
  create temporary table if not exists topic_renames (old_slug text primary key, new_slug text not null);
  truncate topic_renames;
  insert into topic_renames (old_slug, new_slug) values
    ('almacenamiento-hibrido-y-respaldo', 'hybrid-storage-and-backup'),
    ('almacenamiento-s3-ebs-efs', 's3-ebs-efs-storage'),
    ('analitica-de-datos', 'data-analytics'),
    ('bases-de-datos-nosql-y-en-memoria', 'nosql-and-in-memory-databases'),
    ('bases-de-datos-relacionales', 'relational-databases'),
    ('beneficios-de-la-nube', 'cloud-benefits'),
    ('cifrado-y-proteccion-de-datos', 'encryption-and-data-protection'),
    ('clases-de-almacenamiento-s3', 's3-storage-classes'),
    ('computo-ec2', 'ec2-compute'),
    ('conectividad-hibrida', 'hybrid-connectivity'),
    ('contenedores-y-serverless', 'containers-and-serverless'),
    ('cuenta-raiz-y-credenciales', 'root-user-and-credentials'),
    ('cumplimiento-y-auditoria', 'compliance-and-auditing'),
    ('deteccion-de-amenazas', 'threat-detection'),
    ('dns-y-entrega-de-contenido', 'dns-and-content-delivery'),
    ('economia-de-la-nube', 'cloud-economics'),
    ('escalado-y-balanceo-de-carga', 'scaling-and-load-balancing'),
    ('estrategias-de-migracion', 'migration-strategies'),
    ('facturacion-consolidada-y-etiquetas', 'consolidated-billing-and-tags'),
    ('formas-de-acceder-y-aprovisionar', 'access-and-provisioning'),
    ('gobierno-multicuenta', 'multi-account-governance'),
    ('herramientas-de-costos', 'cost-tools'),
    ('herramientas-de-desarrollo-y-frontend', 'developer-and-frontend-tools'),
    ('iam-fundamentos', 'iam-fundamentals'),
    ('identidad-federada-y-acceso-entre-cuentas', 'federated-identity-and-cross-account-access'),
    ('infraestructura-global', 'global-infrastructure'),
    ('integracion-de-aplicaciones', 'application-integration'),
    ('inteligencia-artificial-y-ml', 'ai-and-ml'),
    ('modelos-de-compra-ec2', 'ec2-purchase-options'),
    ('modelos-de-servicio-y-despliegue', 'service-and-deployment-models'),
    ('monitoreo-y-operaciones', 'monitoring-and-operations'),
    ('negocio-escritorios-e-iot', 'business-apps-desktops-and-iot'),
    ('otros-servicios-de-computo', 'other-compute-services'),
    ('planes-de-soporte', 'support-plans'),
    ('precios-de-almacenamiento-y-transferencia', 'storage-and-transfer-pricing'),
    ('proteccion-de-red-y-aplicaciones', 'network-and-application-protection'),
    ('recursos-de-seguridad', 'security-resources'),
    ('recursos-tecnicos-y-partners', 'technical-resources-and-partners'),
    ('redes-vpc', 'vpc-networking'),
    ('responsabilidad-compartida', 'shared-responsibility');

  -- Theory: keep one row per player and topic under the new slug.
  insert into public.theory_progress (user_id, topic_slug, completed_at)
  select p.user_id, r.new_slug, min(p.completed_at)
  from public.theory_progress p
  join topic_renames r on r.old_slug = p.topic_slug
  group by p.user_id, r.new_slug
  on conflict (user_id, topic_slug) do update set completed_at = least(public.theory_progress.completed_at, excluded.completed_at);

  delete from public.theory_progress p using topic_renames r where p.topic_slug = r.old_slug;

  -- Missions: ids are <topic slug>-<number>; an old and a new row of the same mission are joined
  -- the way the site joins them (best score wins, a completion or an acceptance is never lost).
  insert into public.mission_progress (user_id, mission_id, best_score, completed, accepted, updated_at)
  select p.user_id,
         r.new_slug || substring(p.mission_id from length(r.old_slug) + 1),
         max(p.best_score), bool_or(p.completed), bool_or(p.accepted), max(p.updated_at)
  from public.mission_progress p
  join topic_renames r on p.mission_id ~ ('^' || r.old_slug || '-[0-9]+$')
  group by p.user_id, r.new_slug || substring(p.mission_id from length(r.old_slug) + 1)
  on conflict (user_id, mission_id) do update set
    best_score = greatest(public.mission_progress.best_score, excluded.best_score),
    completed = public.mission_progress.completed or excluded.completed,
    accepted = public.mission_progress.accepted or excluded.accepted,
    updated_at = greatest(public.mission_progress.updated_at, excluded.updated_at);

  delete from public.mission_progress p using topic_renames r where p.mission_id ~ ('^' || r.old_slug || '-[0-9]+$');

  drop table topic_renames;
end
$migration$;
