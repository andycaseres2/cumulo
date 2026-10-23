import type { ServiceFamily } from '../../../domain/ServiceFamily';

export const s3ClassesFamily: ServiceFamily = {
  id: 's3-classes',
  title: 'S3 classes: how often you access and how long you wait',
  summary:
    'Decide by access frequency, whether you can tolerate losing an AZ, and how long you can wait on retrieval: milliseconds, minutes, or hours. The cheapest classes charge for retrieval and a minimum storage duration.',
  services: [
    { name: 'S3 Standard', summary: 'Frequent access in milliseconds, multiple AZs, no minimum duration and no retrieval fee.' },
    { name: 'S3 Intelligent-Tiering', summary: 'Unknown or changing patterns: moves each object between tiers automatically, with no retrieval fee.' },
    { name: 'S3 Standard-IA', summary: 'Infrequent access (about once a month) in milliseconds, multiple AZs, 30-day minimum.' },
    { name: 'S3 One Zone-IA', summary: 'Like Standard-IA but in a single AZ: cheaper, for data you can re-create. 30-day minimum.' },
    { name: 'S3 Glacier Instant Retrieval', summary: 'Archive read about once a quarter, with millisecond access. 90-day minimum.' },
    { name: 'S3 Glacier Flexible Retrieval', summary: 'Archive accessed once or twice a year: restores in minutes or hours, free bulk retrieval. 90-day minimum.' },
    { name: 'S3 Glacier Deep Archive', summary: 'The cheapest storage in AWS: access less than once a year, restores in 12 to 48 hours. 180-day minimum.' },
  ],
  cards: [
    {
      id: 's3-classes-1',
      prompt:
        'A bakery in Arequipa stores the photos of its ordering app in S3. Each photo is opened hundreds of times a day and must load in milliseconds, with no data retrieval fees. Which class does it use?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA charges for every GB retrieved; with hundreds of daily reads, that fee outweighs the storage savings.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval is designed for access once a quarter; with constant reads its access costs skyrocket.' },
        { service: 'S3 Standard', why: 'S3 Standard is for frequently accessed data in milliseconds, with no retrieval fee and no minimum duration.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA is for infrequent access, charges for retrieval, and stores everything in a single AZ.' },
      ],
      answer: 'S3 Standard',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-2',
      prompt:
        'A design agency in Rosario uploads working files to S3 that are read many times a day and deleted after 10 days. It wants to avoid paying to keep them longer than they actually exist. Which class does it use?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA has a 30-day minimum duration: deleting after 10 days still bills 30, and it also charges for retrieval.' },
        { service: 'S3 Standard', why: 'S3 Standard has no minimum duration and no retrieval fee, ideal for short-lived, frequently used data.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archives objects, requires restoring them before reading, and bills a 90-day minimum.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA also bills a 30-day minimum and per-GB retrieval; it is a poor fit for 10-day files.' },
      ],
      answer: 'S3 Standard',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-3',
      prompt:
        'A digital news outlet in Mendoza uploads thousands of articles and images a month and cannot tell which will go viral or for how long. It wants to save money without writing rules by hand. Which class does it use?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA is for known infrequent access; if an article goes viral, every read pays a retrieval fee.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering is for unknown or changing patterns: it moves each object between tiers based on usage, with no retrieval fee.' },
        { service: 'S3 Standard', why: 'S3 Standard works, but it does not lower the cost of objects that stop being read; it misses the savings they want.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive takes hours to restore; it cannot serve content that may become popular at any moment.' },
      ],
      answer: 'S3 Intelligent-Tiering',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-4',
      prompt:
        'A record label in Medellín stores songs that suddenly get played a lot and then nobody requests them for months. It wants each file to get cheaper only once it stops being used. Which class does it use?',
      options: [
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval charges more per access and a 90-day minimum; a song that becomes popular again would be expensive.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering moves objects not accessed for 30 or 90 days to cheaper tiers and brings them back to the frequent tier when used.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA does not move objects based on usage, charges for retrieval, and stores data in a single AZ.' },
      ],
      answer: 'S3 Intelligent-Tiering',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-5',
      prompt:
        'A clinical lab in Trujillo keeps the only copy of its backups in S3. It reads them about once a month; they must open in milliseconds and survive the loss of an entire zone. Which class does it use?',
      options: [
        { service: 'S3 One Zone-IA', why: 'One Zone-IA stores data in a single AZ and does not survive its loss; AWS recommends it only for data you can re-create.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA is for access about once a month, in milliseconds and across multiple AZs; AWS recommends it for the only copy.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archives objects and takes minutes to hours to restore them; it does not offer milliseconds.' },
        { service: 'S3 Standard', why: 'S3 Standard meets the need, but for monthly access storing there costs more than an infrequent access class.' },
      ],
      answer: 'S3 Standard-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-6',
      prompt:
        'A credit union in Cuenca stores old account statements. Members request them roughly once a month, they must open instantly, and there is no other copy. Which class fits best?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA is designed for monthly access in milliseconds and stores data across multiple AZs, suitable for a single copy.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval is designed for access once a quarter; storage costs less, but access costs more than Standard-IA.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA lives in a single AZ; for data that cannot be re-created, AWS recommends a multi-AZ class.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive takes 12 hours or more to restore; a member cannot wait that long to see a statement.' },
      ],
      answer: 'S3 Standard-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-7',
      prompt:
        'An online store in Barranquilla generates thumbnails of its photos, which it can regenerate from the originals. They are rarely viewed, but must load in milliseconds at the lowest possible price. Which class does it use?',
      options: [
        { service: 'S3 Standard-IA', why: 'Standard-IA stores across multiple AZs and costs more; paying for that resilience is unnecessary for data you can re-create.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA costs less than Standard-IA because it uses a single AZ, with milliseconds; ideal for rarely used data you can re-create.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering is for unknown patterns and stores across multiple AZs; here access is known and the data can be re-created.' },
      ],
      answer: 'S3 One Zone-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-8',
      prompt:
        'An insurer in San José already stores its documents in one Region and replicates a secondary copy to another Region. That replica is almost never read, and it wants the lowest cost with milliseconds. Which class does it use?',
      options: [
        { service: 'S3 Standard', why: 'S3 Standard is for frequent access and costs more; a replica that is almost never read does not need it.' },
        { service: 'S3 One Zone-IA', why: 'AWS recommends One Zone-IA for Cross-Region Replication replicas: the original stays in another Region and the copy costs less.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archives objects and does not give millisecond access, which is part of the requirement.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA works, but costs more than One Zone-IA, and its multi-AZ resilience is unnecessary for a secondary replica.' },
      ],
      answer: 'S3 One Zone-IA',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-9',
      prompt:
        'A civil registry in Tegucigalpa keeps images of records for years, and they are requested roughly once a quarter. When someone asks for one, it must open in milliseconds. Which class does it use?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval requires restoring the object and takes minutes to hours; it does not meet the milliseconds.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval is for long-lived archive data read about once a quarter, with millisecond access.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive is the cheapest, but restores in hours; it does not work if the records must open instantly.' },
        { service: 'S3 Standard', why: 'S3 Standard gives milliseconds, but it costs more to store data there that is read only four times a year.' },
      ],
      answer: 'S3 Glacier Instant Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-10',
      prompt:
        'An events agency in Panama keeps photos from past years that are opened a few times a year. If a client opens the gallery they must show instantly, at the lowest storage cost. Which class does it use?',
      options: [
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval gives milliseconds at a lower storage cost than Standard-IA, for data read a few times a year.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA also gives milliseconds, but storage costs more; it is designed for access about once a month.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval archives the photos; they would have to be restored before showing them, which takes minutes or hours.' },
      ],
      answer: 'S3 Glacier Instant Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-11',
      prompt:
        'A construction company in Valparaíso archives blueprints for disaster recovery. It reads them once or twice a year and can wait hours, but sometimes needs an urgent blueprint within a few minutes. Which class does it use?',
      options: [
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive only offers standard retrieval (up to 12 hours) or bulk retrieval (up to 48 hours); it has no minutes option.' },
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval is for 1 or 2 accesses a year, and its expedited retrieval typically takes 1 to 5 minutes.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval gives milliseconds, but storage costs more; here they can almost always wait.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA stores in a single AZ; a disaster recovery archive should not depend on one zone.' },
      ],
      answer: 'S3 Glacier Flexible Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-12',
      prompt:
        'A production company in Guadalajara archives raw video. It restores it once or twice a year in large batches, can wait 5 to 12 hours, and wants those bulk retrievals to be free. Which class does it use?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'In Glacier Flexible Retrieval, bulk retrieval takes 5 to 12 hours and is free.' },
        { service: 'S3 Glacier Deep Archive', why: 'In Deep Archive, bulk retrieval takes up to 48 hours and is cheap, but not free.' },
        { service: 'S3 Intelligent-Tiering', why: 'Intelligent-Tiering is for unknown patterns; here the pattern is known: an archive with planned restores.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA charges per GB retrieved and storage there costs more; it is not built for a yearly archive.' },
      ],
      answer: 'S3 Glacier Flexible Retrieval',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-13',
      prompt:
        'A notary office in Sucre must keep scanned deeds for 10 years that are almost never requested, less than once a year. It can wait up to two days to retrieve them and wants the lowest cost. Which class does it use?',
      options: [
        { service: 'S3 Glacier Flexible Retrieval', why: 'Glacier Flexible Retrieval is for 1 or 2 accesses a year; it works, but costs more than the cheapest archive option.' },
        { service: 'S3 Standard-IA', why: 'Standard-IA gives milliseconds that are not needed, and storing data there for a decade costs far more.' },
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive is the cheapest storage in AWS, for multi-year retention and access less than once a year.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval gives milliseconds for quarterly access; that speed is unnecessary and costs more.' },
      ],
      answer: 'S3 Glacier Deep Archive',
      topicSlug: 's3-storage-classes',
    },
    {
      id: 's3-classes-14',
      prompt:
        'A hospital in Montevideo must keep closed medical records for 7 years that almost nobody reads. If an audit requests them, it can wait until the next day. It wants to pay the minimum. Which class does it use?',
      options: [
        { service: 'S3 Glacier Deep Archive', why: 'Deep Archive is the cheapest, and its standard retrieval typically finishes within 12 hours, in time for the next day.' },
        { service: 'S3 Glacier Instant Retrieval', why: 'Glacier Instant Retrieval gives milliseconds that nobody needs here, and storage costs more.' },
        { service: 'S3 One Zone-IA', why: 'One Zone-IA stores in a single AZ, and AWS recommends it for re-creatable data; medical records are not.' },
      ],
      answer: 'S3 Glacier Deep Archive',
      topicSlug: 's3-storage-classes',
    },
  ],
};
