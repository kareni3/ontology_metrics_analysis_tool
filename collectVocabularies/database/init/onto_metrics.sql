PGDMP                         x            onto_metrics    12.3    12.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16393    onto_metrics    DATABASE     �   CREATE DATABASE onto_metrics WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1251' LC_CTYPE = 'English_United States.1251';
    DROP DATABASE onto_metrics;
                postgres    false            �            1259    16424    class    TABLE     �  CREATE TABLE public.class (
    name text,
    "Classconnectivity" numeric,
    "Classfulness" numeric,
    "Classimportance" numeric,
    "Classinheritancerichness" numeric,
    "Classreadability" numeric,
    "Classrelationshiprichness" numeric,
    "Classchildrencount" numeric,
    "Classinstancescount" numeric,
    "Classpropertiescount" numeric,
    id bigint NOT NULL,
    vocabulary_id bigint NOT NULL
);
    DROP TABLE public.class;
       public         heap    postgres    false            �            1259    16442    class_id_seq    SEQUENCE     u   CREATE SEQUENCE public.class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.class_id_seq;
       public          postgres    false    204            !           0    0    class_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.class_id_seq OWNED BY public.class.id;
          public          postgres    false    206            �            1259    16469    class_vocabulary_id_seq    SEQUENCE     �   CREATE SEQUENCE public.class_vocabulary_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.class_vocabulary_id_seq;
       public          postgres    false    204            "           0    0    class_vocabulary_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.class_vocabulary_id_seq OWNED BY public.class.vocabulary_id;
          public          postgres    false    207            �            1259    16394    test    TABLE     C   CREATE TABLE public.test (
    test_cl numeric,
    asdsad text
);
    DROP TABLE public.test;
       public         heap    postgres    false            �            1259    16418    vocabulary_metrics    TABLE     4  CREATE TABLE public.vocabulary_metrics (
    axioms numeric,
    logicalaxiomscount numeric,
    classcount numeric,
    totalclassescount numeric,
    objectpropertycount numeric,
    totalobjectpropertiescount numeric,
    datapropertycount numeric,
    totaldatapropertiescount numeric,
    propertiescount numeric,
    individualcount numeric,
    totalindividualscount numeric,
    dlexpressivity text,
    subclassofaxiomscount numeric,
    equivalentclassesaxiomscount numeric,
    disjointclassesaxiomscount numeric,
    gcicount numeric,
    hiddengcicount numeric,
    subobjectpropertyofaxiomscount numeric,
    equivalentobjectpropertiesaxiomscount numeric,
    inverseobjectpropertiesaxiomscount numeric,
    disjointobjectpropertiesaxiomscount numeric,
    functionalobjectpropertiesaxiomscount numeric,
    inversefunctionalobjectpropertiesaxiomscount numeric,
    transitiveobjectpropertyaxiomscount numeric,
    symmetricobjectpropertyaxiomscount numeric,
    asymmetricobjectpropertyaxiomscount numeric,
    reflexiveobjectpropertyaxiomscount numeric,
    irreflexiveobjectpropertyaxiomscount numeric,
    objectpropertydomainaxiomscount numeric,
    objectpropertyrangeaxiomscount numeric,
    subpropertychainofaxiomscount numeric,
    subdatapropertyofaxiomscount numeric,
    equivalentdatapropertiesaxiomscount numeric,
    disjointdatapropertiesaxiomscount numeric,
    functionaldatapropertyaxiomscount numeric,
    datapropertydomainaxiomscount numeric,
    datapropertyrangeaxiomscount numeric,
    classassertionaxiomscount numeric,
    objectpropertyassertionaxiomscount numeric,
    datapropertyassertionaxiomscount numeric,
    negativeobjectpropertyassertionaxiomscount numeric,
    negativedatapropertyassertionaxiomscount numeric,
    sameindividualsaxiomscount numeric,
    differentindividualsaxiomscount numeric,
    annotationaxiomscount numeric,
    annotationassertionaxiomscount numeric,
    annotationpropertydomainaxiomscount numeric,
    annotationpropertyrangeaxiomscount numeric,
    attributerichness numeric,
    inheritancerichness numeric,
    relationshiprichness numeric,
    attributeclassratio numeric,
    equivalenceratio numeric,
    axiomclassratio numeric,
    inverserelationsratio numeric,
    classrelationratio numeric,
    averagepopulation numeric,
    classrichness numeric,
    absoluterootcardinality numeric,
    absoluteleafcardinality numeric,
    absolutesiblingcardinality numeric,
    absolutedepth numeric,
    averagedepth numeric,
    maximaldepth numeric,
    absolutebreadth numeric,
    averagebreadth numeric,
    maximalbreadth numeric,
    ratioofleaffanoutness numeric,
    ratioofsiblingfanoutness numeric,
    tangledness numeric,
    totalnumberofpaths numeric,
    averagenumberofpaths numeric,
    name text,
    version numeric,
    id bigint NOT NULL,
    version_name text
);
 &   DROP TABLE public.vocabulary_metrics;
       public         heap    postgres    false            �            1259    16430    vocabulary_metrics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vocabulary_metrics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.vocabulary_metrics_id_seq;
       public          postgres    false    203            #           0    0    vocabulary_metrics_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.vocabulary_metrics_id_seq OWNED BY public.vocabulary_metrics.id;
          public          postgres    false    205            �
           2604    16444    class id    DEFAULT     d   ALTER TABLE ONLY public.class ALTER COLUMN id SET DEFAULT nextval('public.class_id_seq'::regclass);
 7   ALTER TABLE public.class ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    204            �
           2604    16471    class vocabulary_id    DEFAULT     z   ALTER TABLE ONLY public.class ALTER COLUMN vocabulary_id SET DEFAULT nextval('public.class_vocabulary_id_seq'::regclass);
 B   ALTER TABLE public.class ALTER COLUMN vocabulary_id DROP DEFAULT;
       public          postgres    false    207    204            �
           2604    16432    vocabulary_metrics id    DEFAULT     ~   ALTER TABLE ONLY public.vocabulary_metrics ALTER COLUMN id SET DEFAULT nextval('public.vocabulary_metrics_id_seq'::regclass);
 D   ALTER TABLE public.vocabulary_metrics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    203                      0    16424    class 
   TABLE DATA             COPY public.class (name, "Classconnectivity", "Classfulness", "Classimportance", "Classinheritancerichness", "Classreadability", "Classrelationshiprichness", "Classchildrencount", "Classinstancescount", "Classpropertiescount", id, vocabulary_id) FROM stdin;
    public          postgres    false    204   �.                 0    16394    test 
   TABLE DATA           /   COPY public.test (test_cl, asdsad) FROM stdin;
    public          postgres    false    202   i                 0    16418    vocabulary_metrics 
   TABLE DATA           �  COPY public.vocabulary_metrics (axioms, logicalaxiomscount, classcount, totalclassescount, objectpropertycount, totalobjectpropertiescount, datapropertycount, totaldatapropertiescount, propertiescount, individualcount, totalindividualscount, dlexpressivity, subclassofaxiomscount, equivalentclassesaxiomscount, disjointclassesaxiomscount, gcicount, hiddengcicount, subobjectpropertyofaxiomscount, equivalentobjectpropertiesaxiomscount, inverseobjectpropertiesaxiomscount, disjointobjectpropertiesaxiomscount, functionalobjectpropertiesaxiomscount, inversefunctionalobjectpropertiesaxiomscount, transitiveobjectpropertyaxiomscount, symmetricobjectpropertyaxiomscount, asymmetricobjectpropertyaxiomscount, reflexiveobjectpropertyaxiomscount, irreflexiveobjectpropertyaxiomscount, objectpropertydomainaxiomscount, objectpropertyrangeaxiomscount, subpropertychainofaxiomscount, subdatapropertyofaxiomscount, equivalentdatapropertiesaxiomscount, disjointdatapropertiesaxiomscount, functionaldatapropertyaxiomscount, datapropertydomainaxiomscount, datapropertyrangeaxiomscount, classassertionaxiomscount, objectpropertyassertionaxiomscount, datapropertyassertionaxiomscount, negativeobjectpropertyassertionaxiomscount, negativedatapropertyassertionaxiomscount, sameindividualsaxiomscount, differentindividualsaxiomscount, annotationaxiomscount, annotationassertionaxiomscount, annotationpropertydomainaxiomscount, annotationpropertyrangeaxiomscount, attributerichness, inheritancerichness, relationshiprichness, attributeclassratio, equivalenceratio, axiomclassratio, inverserelationsratio, classrelationratio, averagepopulation, classrichness, absoluterootcardinality, absoluteleafcardinality, absolutesiblingcardinality, absolutedepth, averagedepth, maximaldepth, absolutebreadth, averagebreadth, maximalbreadth, ratioofleaffanoutness, ratioofsiblingfanoutness, tangledness, totalnumberofpaths, averagenumberofpaths, name, version, id, version_name) FROM stdin;
    public          postgres    false    203   Ci       $           0    0    class_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.class_id_seq', 2340, true);
          public          postgres    false    206            %           0    0    class_vocabulary_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.class_vocabulary_id_seq', 1, false);
          public          postgres    false    207            &           0    0    vocabulary_metrics_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.vocabulary_metrics_id_seq', 111, true);
          public          postgres    false    205            �
           2606    16452    class class_id 
   CONSTRAINT     L   ALTER TABLE ONLY public.class
    ADD CONSTRAINT class_id PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.class DROP CONSTRAINT class_id;
       public            postgres    false    204            �
           2606    16441     vocabulary_metrics vocabulary_id 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vocabulary_metrics
    ADD CONSTRAINT vocabulary_id PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vocabulary_metrics DROP CONSTRAINT vocabulary_id;
       public            postgres    false    203            �
           1259    16484    fki_vocabulary_id    INDEX     L   CREATE INDEX fki_vocabulary_id ON public.class USING btree (vocabulary_id);
 %   DROP INDEX public.fki_vocabulary_id;
       public            postgres    false    204            �
           2606    16479    class vocabulary_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.class
    ADD CONSTRAINT vocabulary_id FOREIGN KEY (vocabulary_id) REFERENCES public.vocabulary_metrics(id) NOT VALID;
 =   ALTER TABLE ONLY public.class DROP CONSTRAINT vocabulary_id;
       public          postgres    false    2706    203    204                  x���[��Ƒ����2��q�y����YR�)�vm^���ٹ[�޺P����p � $p��٘��{!��p|@u�����������_���U�o�/�������?=?��7o>�<�^=<����͛����ӛ?�z�>g�I6Wpf������|�y�����J�П_����������yyQ4-VZ���^?~XD�� �r�����aZ����lQԢ��P������Գy�)�1�ż;�]�r7˟�������������p�E�χ�O�燉.�Xˍq�^�e/B��#������y�{�����sEo�y�y��t����Y�����_7��«����,�����ۇ_q$K�M�l�H���>�Y��CU��>�?*��k�Vk�F�Z�zCN�1�6�#,WZ��Ѵ MGF�H��F���M	��E�ڕ�_�*�Yލ�,�,��p���',����fT|�Z3��~����X�Scn��⚮LUk�%]�<,�Օ)�ZrW���ĮL���]�r��2����l8R���Z��+���Wwev����,��+3˧-'��ە9���ue~�Zӕ�E����bWV\ӕ�j���+������VK��Z�ؕ%�0�+KjqBW�܂4]Y
G
֚�]�����v�5�"W�<ְ����������Jk�Y9UWZ�*��+�aѥ������+��JKUk�]i��=]iɵZbWZ�-N�JK���]i)�8ܕ�RRt��̑�--Lߕ�\ī���E��y,˫�J��i��o�v�g�t]i_��t�e�Ů���ؕ��x�=�����oj���ͧ��a�CaL.ú6�'I�;/Ҝ��,G�W�ʩv���um��_����>_?�o/�NiqL󋴗���ps�O�"�i�����_��5�U������� $s��@H�59�����p�~��/ ����ݏ��>n��1,��oı�*�x�������qy��"l�l�z��-�Ȃ�tx<>l�DX��� c��*�����|Ł��r�2�����2�E���!��ߐ��𷟿!,�?��o~��⯟/�z�ZY+����Es=�^;f����[�^'Lw8�uJ�*V�MX'�:m������K$��0�`��k,'���٦JOؚ<�`>6�b
�Jا<!a>6�8=al�a��؝��K`��'2,�}:�ְ6k��0��o���؟���؞�� +�������g�fl��g_d�͟���VA�g�&}���x��׌������ãʪ[�}��*�ӷ��OO8��� �˖!?�\߽ye���<|8�����M*C��=��/�`������������OǛ�O�\{����mA��~�~�S���\��O����r���7��?^�O����G��Ǜ���A��p�w�*g�]�z[�h���Xc8�|�~e������Z���`����������o���ϟ�'�����Ǘ�[\
[�T������w��>~�9����O�~:�\߶�Ng��O�4S����n���a���������������FjAG��?����,�]����՛߼<�}H���r�? �тd�������B|01�{��y����Q����lGe��ݪ�mO?����Ԣ0p�Ap�v�q��w�s�Nh�B��,�p��,머w6������S��$�>;GC�7u�%갤c��{^�X.���9�J��u�5Rܨ:�:�[űZ�q,�pw�<�$�D:�*	��γH�-��,��i���E�gm 3ܢ���8��m��|¹ࡁ��>�c;�(���s��*����@�@8Wx4႕��3.��0��k��C�9\����?\��~��pC�n��L\�v���������(=}q�p��� q�������_e��*ؐ�A��؂�	��؂�я�؁�3!�1�@~.b�)���؃z�������}�G~.aoꐟK�M�l��}( ?�������*"?��Gu��%��n���������C~.c�����بj~���@~.{���A�A~Y8��"�,��*䗱���_���A~[���u5�+��ȯ`�w!���@~���l��W��;�_�VW!�� Z:�M{Ot���=��;O��o�<U�1��L-��&�L�y[F~ޤ!bo2Ga��M�(���B��%�W@~�XG����H�yb���D,���<�!
�9O,Q�%�Ւ��'�KF~޲T"��5R ?oY'}�XVK� �%��������e���-�$#?oY���@�g����\a&8��o���8W!���K�G�l>M.��exXg�����q^+W
�b��E�+0@/O/�q�M��m`S"�=6%D��cOn�@�Mj9��=
q��ء��@�%�=6�:�.�p^Ky.����k���k����E��A�!��Q �>c��`���v>��	��+gPP�������ؠ0(\�s `+�f��(�A����]*�A�Oup�Gl�n8�#v���}���>bϪࠏجZ��#�p�G�>	G��s\S��$l8�vx�	����-�	}�^��A����p�'l�8�v�}�>>c�w�A����p�glu�y���̨=c�{�`{�`������홁�����V���[	6�oE8����`#�V�����,���<Fʷׅu��S0,� ��!
C�`X"�%�a�$8�%��`X*�)�`0���U�a��K&��@�� �J�"�p0�#��@,�.8(�\<E!{��;P¹x��8]	XG�5������`�V��/�p�.2,v$"��bGB2,6d��`�=2,v%&��a'Jd08��26f[���!���2�0#%2��D��>�!��cW��`�؟=d0xlP-��)��.��ws��GE.<v����������q��ku\0�X[U�B����� �\0��Wp���'A�4\0��..vw[�������!b��`���=\0D�x���}��CĖ���!b��`���.�z�pQh��.�3�������₡=.p{�`h��.ڣ 'q����`h��I\044�$.twJ.2��7���uTp���)r��Y�.?eH�9Q��,Q�%3�%r��r)�`a�d.XX#,���U
��o�I\��J,���������Qp��������gB4$do�nGcq.!�8����xXG��	���D�+p�h����`4���`G".	;r�Hؐ=\06(䂑�=.	�s�H؉�����#acvp�Hآ�FD\0ZlH���~�`���`�؆����F�]���b�p�h�A�\0Zv�����N�`t[f�����`tإ:.�j7�{W��î�q��cU\0:lU-��.�p�wp�腃_�����\0za�p��û�`���\0zl�N.=����Y먹`���=\0z�x�ƀ}��c�����1`��`��.Âz�pQl��.�3�������₱=.�{�`l��.ۣ /q����`l��K\064�%.t�J.#��7����uTp��)r�Y�.?%H��1���]L,Q�%�%q��X.���R�\0&�H�cb����X-}�$�L��1�J��U�`�,��cfqd.3˳�� s�����n�s¹���k�`.�N,V�\�Ε�`�R������`���\�`Gb.X�!��`��\�`{J\�`Wb.�v����n����`cvp�d�ELq�d�!L�Q���3R��`J\0��.��R�a�p�DؠZ.���)�D؉L�e��\0���a��`"l�n.�{W��Ů�q�d�cU\0YlU-�J�.��p�wp�d��_�����\0Ya�p�d�û�`���\09l�N.����&�����a��p���e.��y'L[��&�]���a�k�`r��E�=^;�`j�    �N.�ڃ������ �Ⴉ={�`j���S#�A����� q���|��`j�=(�`
,�Z���
\0�Q�Spc��S`���X ���(��R`�:,X-���r�\0E�J�)�F
.�"�o��j�$�dL�U�`�(-
s�Y$�����\0E�gL��\a&$���v�8W!��t%L��:z.�R��L)�\����|�Sʸ@L	;q���#!L����
�`�؞L�R��;Q����fl�.��E!�ؐ�lH�����0#E.X�E.X���`��������lP5,�N�D�f�e��\0�Q�f�]���`�vs�l�wu\0�Z�;V���V�B�l� ����}�$�
.�I8�wr�L�.�႙�û�`&��.�	[��f�^�r�L��z.�	��f��`���\0[l�.�-v��f����팝Q/.���B��s{�wr���]\0��q���@��s{%.����G����s��Q��c���:�W��ٱ�
.�]#E.����'�	\0{�0�˞%갤g�$.�=�%s��Y*�f�)�`����U<��oϒ	\0VI��9�J́E��`,��s`yvq��fB�B���v	�
#$d���9XG�s4��9��`�V��\0G�tq��#�;r��!{�`�ؠ���)p��+1�	;Q�9a7vp���1;�`Nآ����`Nؐ���(p���)q���%.��a��R�s����9c�j�`��Ne�D��-3��{T��T�3�j?�ػJ.X�k�\�`��`�VUC��i,�A���p�k�`���\������>.X��;�`1��\��u-,�]�������`��\���N.X�|,�\���V�p�b�K��J{��vp�Ҟ)��\��i,�qA��K{6��p��$��F���K��I₥��$q�Ҡ{Rr�bYh�����`������H��:u�ɲ@,6Q���uXҲZ,�咹`q,���c�\�8�I�*���7�c�.X�$p��X%��"�\�8G�ű<��`��
3����}�]�Ź����q����}a���������;�����`��
\��$�c.X|�����W���`	ؑ�����cl��Ĝ��
�`	؞,�s��%.Xv���,�`	ؘ�\��&�"��E\�lH�KĆD\�D�G��(�H���m(q��7���P�ؕ\p���&\��t��^�S�_%b'6.��F�r�n(X6�K��A���O��`Iظ:(X��
������%a�j	WIx�v@���S�
�,��
(X�p�%��
���K��[�
f�u5���P0c�wA�������
l�(X��;�`�VWA��@^JVԞ-�=P�=P�{�`{j��A��� ��@�ɴY��5�ZF 5�Q���0�a����yS�]�Yn��5�U�`c=p���1T��5��qb�>X�h� �ƱXz��MB�5���a�d�DHXY-%�����yj���3��	���e�RX�X/�0�Kf�5�e�aa�d�v�`�4+lҷo�kr���h��+�a-T`!=2$�,��aM&�,@�Z�J05��Ѕk9�M�k2�&�5[���bت�llT��|�O�x�I��ؗ��������6+�5[Ě���bM��b��klH�"�ؑ=�L���s�Z
;�$�bتZ�X�OEhV�'K��[��kMlU�&�
ج:�X�`�v��Z[X�Dl^Q�e�qUH�V����ZO��Xk	;@U�ń�@���6M�^�Xk�,�*��]d�V�>�@�d6{'[����p������Z
[�/�b��2_�%��;c����Ak-�w=b����5��Y 4-vj+��X3i���ڃ���3�\7��`%�iC�G�Ӆ"���Ԡ���=(2il��Ȥ����&��%�]Xh�4VTE�C���b}�*,�HK�$XX���M&���S�F2,�LɰZ�H��w�M�3dX<�4�a�$�H���H#�KAɰL
�H���G�LfE�?���v���da�9��%�D� �D����(�d�4%��@���
}��{�F�؛�4����"�d�U1i$��*�F�؟i$�=)�F�ؗ=��,�hi$��
I#YlMH�akB�H;S"�䄹)�Frؐ"i$��E�av�Frة]�����4�c��<��$$��<��4��V�I#ylV%i$��O�c+I#yl^%i$���#��c�Ȍ<��=������F
�N�!���`/i� �	*�H{��4R�>�!���{I#�z5i����A)`�w�F
��
�H;��4R���!���;H#Elzi��@hJ�D1|����n�f�]0���,���P���V�"UOM�i�i�D-L��Q[I��$�<�)%O,�^��BK��+�!���*�FJ�X��2K%�F�4�	<�2����̺���2�!��ES���j�Hcf�:�'�n=�Y<�4�K$���Ica�4���L�XX(Hq~��Ҹ(QH�����S2�WN�R`�H���BҬ��p�b�Yc��t���"=c�lRiZ�M*Jk�M;&�5ر�h�[V1s��v���%�S͔����ߖ�c�s���4�-a�J'�%�T鈰���8;,	#��"ql���5�K@��خ3�a�.`$.�M;A��;v�mg��~�����W#H���؝¿�X�܉q���
�U�\� g�
{v ����Z��	�\|=�k-��:�ׅ�;���fR�a�NH��u8l�W	J`��`��g�@�B�:��������#� l�;�V̧�a��;�6�3y|�C�*p{��=}�_k�+;��Z��K���y��5��a{�x#��������i���G���#(�]���"a�D�J������A�1S���P�K{��4��	
v��s��<�c�~��_�Ch�B�!�0�ؐ�(a��Ä�~
�)%�,�^��B�7�UݓG7�*n�#+�g��R�7�1a�=jd�zY7��7�p���Ģ)�e���eM�XG�$֭�g�'�g&�K��L��xטX.��ab�`�&j7X���|i\d҅o.[�/��p�r�d��GR��8�r���!��TC1�r�E��^�&�a�&�e�6홠;V�[V3s��b�SՔ.ث�`�v���m+���*��`�JG�3ب���a�j��3ؤ��viXt�U���� ��`�*��3�X�=>g�5%��h˚�_rt��*����U���#����a�*_rt���|�����%GGز���1��#a9�y��YaSм�謰-�}��YawP���,�z�K��b�����,6{�K��b׫_rt��%Gg���^rt{_�s��/9:����s��/96hKi^rtnٔ���=��{X�k�-�^�ڣ	��E��H��b��=���X�k���"]{�`%���+�H�X�E�F���E:ϒ��,�t�<+���w>���ݺ�X��K%�{�@C�p[��������7�.�p��bX4���VKs��+��=�u����I��.�^�hd����ri�'#ˤ`�.�P�Y���K�"F!]��ΗL�8_9yb�e�#)XH�U�p�f�%+�PL��p�����I�y��I�A��M{&h�Gk��܄����T5�3�j���رs=cۊ?c��'A�N�����9;�0RU,2c��Xd�.�a��U�"�l�,شZYرo��>��/9���)�Ȳ�N�K���/9��=+���
���K���Y���
�l�K��`�*a�7غ�����U���v��=Go�xU��荰��s�F������{�f���7��������v4~��L�p��Y���'��7=ac��p􄽭}��v��GO���������p���p��7=aOk�p�}-�����������(�fWd�|��q��Ɲ��Ou��hۢ���������7    �?�1Wtq��ph�P���k���"�~|x����� �wW�P~��?���u�<�@{��r��������ַ��ww��Q,��������9#T{������R�8�e.�~Q@��P���ΙF��]+�[8Ta���|x�px~CWq�s�"���o&ǜ[7���ʧIc{��ӭ[{Ze�����=+�����q�枖��[7��ȅVU<Y~G��u�^�*T��u�+������������?����������:u��\�򷏇��o�<<�?�B\����G�"B��^`t
�eé����4����v���l���Ԣ{���_6��)	*�v؞6��8\C:l���/��)��Gk_H�ӝ��Q�\���m�r��7���č�O�(��č���7�{Z:q�n\7�x����̉-�ǷO]8���5�r
�u����Ⱥ�����
�y��.nzҺ]/O]��Ա���$8���MlUՙ����u榰^A}榸^@s�&����M�+ogn*-N{�fӢ���̈́�h��lq����Kgn�8����ASLw�権�q��)�=ss����\p��-�����"�Z>s˺���ܲn�=gnY���3���|ϙ[�=�w�u_w����,��eݮ=gn0S��9s��?s�a�j��`���s���+h��`�zř{Mu�S-E�Lnq�37�Ң���dpř�p��dq�p�r8����5�Tgn����?sEMA�(	�Tgn���Hgn ���gn����37�uOw����{Ǚ��������|Ǚ�ǻ��`�}�w��~��`���u�کcw��NphǙ�ت�3�M���un����u~����u�5ݙ몥��K�YM�t��m���ѹE���p���3=b\�EVf��.�\C:s=�|����o���_�w�b�3�{M��3�MA��PMw���ˈg����z����=�v�����^=vq�u��<tú�7]\l��+�..�n�a[KGoXwm߃���ս::���'odêN�8�䮓7��
�7���D�����Sn��͋�4��u�^D��?yO�2�Θ�q�ڡ{z=�|א�dp�t�&��[���HVSGw�&���q�&�)�=oS����q�M�}���$Z>oӺ���ۼn���6��{�y��]����6�=o󺹻��̶��ۼ����6O���f����vۭ�ݪ:l�Ԑ��B�ԇm��4&)�5�a۞���ö,�����o�ѱE��+$�=HAEVf\��s͡=EA%��=_A�۳��}�^~�=f���N�؞�ȵ��nlOc��S7/TS���\F:u�|�}�F#�Z<u�Y�t�ͺ��O�H�&�w�FZw��S7Һ�;O�H���=u#���S7Һk�N�HS�v����*O�H��ө;��i�ԍ{��h�z�-��8Ĳ�TGnl�b�呻T�=c	�a��č�1J���=FAE��qO�!dO5�!��=^A�ґ��������=e������E��q䶇1rA��PMw�:�ˈG����:�����=�}�uo��n��;�\���}G�_�y�����}�z��t��u�v�~j��#�>����*�~�ƭ#\nYO�������g��b`��婺�������ŗ1�>�_�o��0s �1�t���+y��<��@��+��?�y�O�Wn��o��w���޿]�>��B������o<��|I���=|�r��H��ۍQM'�{�ȹ��p�{_��O�Ϩ|i��O��=���c�y��m��+��?H���s�e����G�����Z@��A���;>��!N�U,Q�j�����7��<�~Z�b�e��l���Њl����������(<׊�����X�hz�=w(�m��G���Ԧ�Am꧱���m꧟:���6���-����i����M�?�!�e�J��RX�6��6ͬ�J��*M��Ѧ��|e��ˈm����"���,��G3����R�>�֣��=?��P\����A�b[��hq��ԣ��U�z���{4-z�Ė��ђZ�f���I�����7i)���I�a�q�&��&Mf*��I��I�q8�IôI��Ԥɰ�&M�-�M:�� _աɰ��M��Mkz�[�W��ҡ����D-�K;4�me�M���4�ȷXܡyޡ�B��th��B7;t֠��2Xݠ��e�Р�*jYa�A�T]U��Y�Z��7��2?E�u��ؠ�͠hP�Բ��mdYxu{ڪ�=�'l[Z���&gZ�7��VfhPh��T=�\���t��-Gգ.�Pݦ�\\�{ԥ�\�GK-��c���S��7��	��6��-.#��g3(zԳVzt����k=��aL��W���Z;]���BWzt�7�/-��{4�VFѣ���T=l��==\�Q�h�-t���J�4�e��IC���4��B�VYh�0UXդf֤����/0-6�H��ؤ�ݠ�cd}Y��>}m�1��W�i�r{]���B}s��>���Q�i2|a�}'�7Q���4N��d[�f��ʻ��4N�4�e4���O
��+}:Ka�W�4N�4��+}:�4UxG����}�.#�if7���+}:�b2����ګ�4W���Osl��>ͩ~q����(�4�0U�6H:�����F̂�O;���e�Ч������B����;��d����Rp�O�a7��� �i6���O�a��}�$��>��EE�����in�,*�47ZA����--V��4�J5��}:-߸Y�}�^�47<;�t���e�J��RX�>M�}��U^��Y����}�)�|]�fʸ�ا�n��ѲV�t��X�_ӧ��W�iceIק��%M�6*���O7K�>m�,�>-�ϛ[�ܧe�����٧���%اeҧ����>��${��ҧ��z�OˤO��ҧ�JS�w���8_٧.�2b�:v�Ύ�]�ҧ�/Ƴ��>�4D
/Q���Zŋ@7������ߖ	�4Nޫ��դ�\�f�����_fD�xzz�9
/����j��������[�ۇ������'Qr#e��o��ߤ�F�j���P��ߴk�D�Ħ��I��!��5����}~�}��p���X�o�����1�1!t�q���O9�����X����Rd#�����^��3;]eN9M�P��ڢ�kW2m�h��5E�ꅒ^ȶ'5#�������������hYC������m����_Ћd9���W�sd��sd�~���A,��<<�?�u��p�pI�q�qO�x�%�;>៟X����ĺ�{�����ǃ�G�r�C4�;9�qZ���#,�Q�]1�����5�٬�ߞ��0�T���������l&c_��Z����íi�A���c9�a��~�_�ٟ������a�肇3�F�M���~8��e���Ë�?����\��b���U{��`P��XU�ϗ������u�����=(�C'��?<|8~����2����]=��ɿl��05_���>	�yz�.y��o��K(f�����u��^��b�5�/���)�5����t�x�,�Q1�x}yw��Ǐ!�6Ii��l�����4BTVw`\?q�r6���j?~D>�����,åA��[�K�BE��F��j.��2?^�?ecƉ��r!�)�0܉�!f���7)�).��鯙��,�Ų��K1�ki�ދ㕝����!es/�]��uӲ���ǳ�{�E-8ًqY��Wc�R��xv	,��v<s,ގ�c��qq��i;��ƹ!t� �?dH;rq��ʎ<��ڑg�i��;rq,��#W�Q�~v�:k2d��M�x;?CN�����&�w��A�ĺ��2��0��.��h��N�q��U�M���Z{������诼mw����)��g�+�������J�?yO.a<�T{r	v-l�%�!\�'��"*���9R��Aƾ=��4�m�\K�ؓK��zO.q���=�D��J�i�bO�� �ړ����ɑ5�ݓ�0b{rLcG�{r�_E��'������#�/�L�՛A2�v�,[�~ZN�8��K[�Q���q�jON��j���҃Yߓ�S�駌�FsC�j\R���� '
  U͍Kba���ؑ/d������:�v��2n����~��^���rC�jC�qV~H�S�!gVQ�!g�O�!Rސ�ܐ(nȅ�6�ºi6��j���ُ�C�~=.i����"-�c��;��m-�6��Xc�.��5�U�Kr���(ݒ\SX*qI��,^�kT��+�]ǟ;��Ɂ��g̈́ո��a�����:�a����5d�3w�v���5a6(/?��n�����0r.��U~�[�|����p԰�;����,���!���K`�Ɲ��s��'_��]n��
Z3���*��,�7�� l��%\�0�T�����qD�/�F�r�	�5a�zA0����b��þ�]ٙ��Ҳ[C�b��V����h;�V�5�q^vk�?��K�Q,�56r�b٭������[�f٭��cˮ5��c�_�gY��n�gaѲ[c�����_���:*���2��n�Lc�z٭9y�Q,�5����XN��[�YEq٭�,�n٭�,����8R���`PXvk���ĺ��n�d��e�ƕ!N��Z͐!,�5�E�������pyٍ�����p��.���R,��咖ݘ�g�by�er (�k&.���ٮYv�&�b�M�<su�n�J岛�0r��n=i�M�y�YvS���e7�!X^v3�'.���ap�̓r=�nv�|V-�����<F岛��(.�9M�����)-�y��e���q�-�Zײ[��)-�ō���QV?}u�m ��/���Xy�m0�v.���X�����-��Ȋ�.����-����-����ݱ�aY��..�d�#,�d�k���YGͲK�eT,�Df��/�D4�h�]";�>$���e��U��]"�O�����K�B�]"PZv�X<��e��.YVK\v��!N��uC���e��e�,K�]v��!\\vɲJ²K6����.Y�J^vɱ\²K��g������AϚI�.9?�vŲK.�]^v����U-��f�R�����Q.��COXvɏ�b�%O�X�쒷C���_�h�²Kޟ�вK~P�c�%���Yvɳ|ҲK~��e��0�e���ġ5��8"�e��0"��.�� -�X��e��01�e��������ag�qU.��wχ;�[P]�o>]��M���sT��?t��/�[j��cL��9e~嵆�~W�*�"��ew���ᗏU�d�;<K���i������6����w�����9�����������(Տ�w�6lG�ʷ��1~Y,����34Z��?�j��)]+��O�d�Qu��@�uUN�~����i��e�5�������$�]���iN�����Q�˒��X��ǛO�B�ʼ4����Tm�3-8�B�;;��99���]�4Rt��#%�uc#.�k�4��WG���Ps�!�9W�i�8���Kc1~k���4�P��h�b�4D�w�Fj��p9o�	SXq��),�n�^�0ş���)�𖰯.�-��)��҄)y'N�RN��I1�8��m�ְj��e󋰆�I��fE�\���P�63�p��8ϊ��S�P��a���b��PI'�']h�	=C�6 6���_�e��S�U����L�%�����=Jl�4A%�љ�?Jl�4�gO�����%V[5E,������Qp�Xb]���qD~u�S�4�S��QGa�Xk'q��֝��"�$�Դ��"6L���b�R��A��?c�4\�b��|�)$��Di�4v���qnŉ]��A��=H�b�4��A�g��᜸=H�>D�g(I<Q1H׉;IC;�k�8�X?H<��$������(<H<�:H������� �� �q'�N�o\�g�:G�/�$a���d�䵃���W��`G�~��[�2���}EƟ��)�f�1��?��px�Kma���0������9k|҃�$���g�T�����/���f%�^)|q��p�/�:~�o/���wUZ�?%�,a��q]~��r��>\/y���� b���!�"�4/����Ն�~�k.��i����>���r��~zx:ʅӠ��u�8~������O?~T�ۙt�ur�$�'�NWa[۞{� ��YF3����ޫډ�S��x%��Oɜ�>#f�S���o�̈l8�4#�w��c����z���1���WMp��٘��&�甕Y1�B�bV�A��X|���sEݴ� �[,�dh���e��M��/����97�D��<����%̒t���Y����,�(M��3J3����!ʼ�.gg���/��jO��C���ǁ�s��j='l΅���0�W�g"��ؓ�W>ȹ1f�� ��X�������
n�G�j�����h��O���A[8��#�G�����hPT;řTs�Q�%�患<����s�k*��i����'߀5c�~bhKC<�t5��15�r��\�]������Zϡ�sa�]6p��\����	`.��\cMH����0�3������a�ŹAGս�ssQ�A8�h8�uLw�u�\i2��u����avu���lL�Y� ��n¹A��p ���_�he9-�6pe���)^3������믿�M��u         &   x�3���2� �D��9�S�S�b���� �Hn            x��]ێ$�q}���a��GB��&�7E�d��V&�{�9�Y����xv-;U5�]׌S��'"#s4�E�"�kĚm���-_}���K\�{9��v��kY4�M�e�b����?Ϳn����3��sQB���v�W+����w�y��4������+V� �*�W�o�Ѿ.�IX��d����?�=.�(=�?㑗6�X�?�?(�Ƭ}�:�?u�cIp��g�Pl�2���Ծ�jr;k�dB����⫐_i��a����vΧA �"G����Y(W$�"`A�jA��ԏC`;�iȔ2H~�+՛�n2Ĵ��.�5q@��~��o^��@�����'��h���Ă�y��O= ��bR���C��n��iS�A&!��f�Y��Ľ�N��(!��+����b��&��u��2v��%���ˈvy�O�u��՞N3j��S������o�fjCh0�!�z7�K[j�Z�ƆU Y���7�:QK��I�%W-Jk�t�q7"!��ڤ8��9i�|ù
Q��S�	�8�V�Î��
{�����'�gw��b���j{���xSh_�F�Ne޲m���4o��&3�W�o�Ajgq͑k�*���w���`��ew5�+V{
Vm������Z{� h:����'Ų�SEQV����Z��V�R�4h�:�vxO�fFm4�L{�j�ٞ�v��[V1M0�rU�;�ڴ�[��l��t��d�crb�"b�\2j�j�
�i��_��c�|��=�IQ�k\Y�vua��m�aC�;�d+j';_�C?����Q�"������o07��K̦,����+&��M���')�6����D�e�;޹���λ)w��;ʶ�Q���?���O���@� �P0E1�jw�ڱR�>h���4��K�����KU�ՎKEe�#_C���6aH<\�*ux�M�̚���ug�vH�(P��`�$ݬ�4��X]�S�;l�R�kѫmњ�7k��&�z�[����e
u�WH%���SԱ{���LT���C���f����9�QT��ْ&����2�5|rIcZR�����%���3$0����KJ*�YZ�O i�Y�����[��K��둤��I^^�
vKI�F�_�;m�0��쯘��k��I֗1�$�OH���7�:%�;/��:d��5l;����)k��������e��ʹW�~��
9�E���Z i��y�)!�6������������t?輜���)ΓY&8 t(*����]�q�6IW���} �l�H��v��_�M^Y9�H;�fX`À��)��jP���������}
��!���c�$��i��4�B�#	�A(:IvZ�����2i�IL.���+�b
auH�RǱ�wg��}���;z�{���4H��O��f|8��W�d^iD��/Չ�``���F�t���]
�z`m�02#z�}�Z�t����ȕN�F��C96h���΢̋X��G�-�)�5�����7�w�����*/p�>����/J:t���UԈM�M���F(�.�b]��WoĆ�8�q
����2T�ˎO�}�t���;H��ֲ�̰�r��o&��+����XA���ȼ@<ޡ^��+�p�Z�}�آ�̎��������B����a�HBA-h�8E��a��7�c���D����l�q�n�uI��2����a�z�U-�+��_m,ޘ7کsK������/�cI�*�[�-U4X��[F��_�hlw)�R�@���e�;SK�������� {�k���ڪ�Sݣc[D?��D��+{B=`��qWe����3��SO���~��E\r�!�RCsք���� �S��������L&2����:�U%��*3!%�*$�r7����|�t�vV�	���;Q1ɻ���/� �(a��N���I�&*}�*T	O�RwT�f���Q)�Tr�Jv Hn��9���#��4/AoT+�a<2�%^��EF7d�g^�%��ѸX�i�-JC!�b��[^�?8�ftŀ�{+�ƥ��b-ORv��CN�Ů�Tz!�w�s���d�xǄ��|Cg��+qq T���l��D(��@��'>~�~�=B�km���:�Ȳ)%��(/L�е��T�s�7X�8@|����a�6#��7҉�z�F|]�|�OW|�M1��G|ʃ��iĆ�J����N��Y�����X�AUC'>�{���C�!93�']z%�[;s�LE���\dX�w#�<
��Df�-��F�Zy��a͓e����.V�Ri7{x@܀�Եm�@�y�r�zҞ�^D�(��J=�H���<�ŷ/�;CG2��6dJ�Ñ����zd/�����?�AOy*n%B����a4���kv�5�������|�fr����M'�-�\��f�� }l��]�6�7��8j@b�`�b5A��0����!�� ��$DMR�E��v�RX�JL0Vh>�Y���������7@�bE��O���_x/��Fn`vm��y�P����y�:+�̰�_����U��f(����9�ׁR��=&�����������O\��s(=���� ��1��Om�#��f�g�i``O%��z�c���� �X�<b��l�ź�yX'1���/ ��&L�=�[D��=j���K{Ԗ~�BTg��@6�O6�����:[�è��a'ar�7^	�sD���x�<�x"�����U��t<Ox��I"���Ǒ���D �'���kF�+=?����d\���\NO2�ZpH/�a�E�]��A�bqc�ݷަ���r���8-ϓ�d&W�ס)�V�f�y���U����HRaD%��{���~�r� V?oY}��3�������-~�@�����4��I@\h ����M��r�rK�.L�}4~(&Qf��'Ǥ.9m���;b3����ǐ��BzD���!$�w55��@bu�~���M��h�>а�&�
d�,hX�j�P4�����Ht� ���*ڟ��^Xm)r�$�q䍉y��⤵�2�c6p���\��:�E�N��a����íq�5�1�Z^��H�ipLDY%��D��iM��2^�5��TDgӴ����/&Fn��d&7�VyPVwH�dw�̙��sZ�g3^����DW�0������fo�tD��g�_F�!�h�&��7L�xI�D8Gj�Gڕ=��sX�������h���{��GT�TG�r|Ejp�8
���;M��mݱ��=�I��NՈ*Qx�	�@�O�Y��8�ᤵH?�_aܵ���Xl��k���<T���H�Zoq���3�����f���{���ٽD)�kt���g�!"c9�z庌Ɖ<��'�?�ѱ;��[{!���![W����M$�e`���.��81��M���8!��>Ɖ��/��Y��G���F��'������_�Q�F�����ݟJ��9T0�y�����y3�?��#���f����b�գ'#��Z�n|  �+Ƅ���Ɲv�os�5������{D�Gc�M4x��C�=��A�6H��v�=�z�2ϘaIO��WTʞ;��L���Rs��I>|�z�z�bBT4���X�&zc��`r�R�0+��nh�`��<�}R���}�&�.=����@~nk�6'q?�G_lܑU>�b$
�<8���r���1�	� ��pH�=*7�|���z������#�DvQ�cGT?0�e����>$
0������N���c<�}��JL�0d�ä��U��&��i*���_}Ã����E��NPP��K9f�bd�jKu�Эr��t.,���f�f0�2��뚬�#�XK;��xRG���?�Ǜ?KQ]I�$���v���@Hr��>v�lc��[EK9����6�DO��#u #�b��$!�4z�*~ڀ �=�pVG``Vcق*KG7(��=��q��8�Ir��A�=u�1譝0�,�a =0]׈�t+���&��1�2@ }��L��!iy-�T*;�.�z̾�u�x !  L�� ]����g�0�ι�"F?�>����@f�\d?q���	��U$�6E"*�9r��:�7�q�O�Y}Tl�8z�cpn��`�e�v.�l�������=��=�ؘ�׮�D+�n5���&$w������id�ȬRcY�qʍ��;-;6u���8�׋���F�C6�3bs�G�)f�����T�����h��_�=�&�Ǭ��IZNu*�(�:���-so��=h����4I@���V�W;Z^���N"<��"0^̱Q�;6�P�%�7p�K�Y��[nv:߬r;
ָ���M��}J%̠��r}>`)5l;�bZmEづ)���F��*)7D=�`l��Y*�;n�����/���4&p2pmM���
K���h�p2���e)�'�s˜R�
M7;+[�lt�_읏��/6��5�h�Fp6h��7��6I�}�^��D�-oQ����s���z�f3K(u6Z�� Xr�7K��JU��;ˬ����Wk�Զ5v�i����1<}C�v�7�H�Z��rȵifJ�'6 �5��3q�h��#��`�q�:�.DH�Q��������j��N�>���P�8=0���8��×	gE�N�9�mw�ӆN�{�4��Dӌ&Lt�A��.��	U{�N�t�9�s�XY���*�ߡ����ko<#���-�A�^R :P�5����vE�4̿��D�*VĜ�N��T�=���k's�N�s�J�Q�D9��K�n��|I#c�-��p���1�gk�
���G�LC�0u%L��L)���\�m�I��Z@Е-R	�9hH��� �(�c�P-� �v@�9�emje9i�	R�o���ĒGd�!�B�8�q>D�#TC����Y�HN^�B�-�`n��Td<{H	WA7����t�=y��NE@1�b5ۻ�f1�<��}����� Tf�(�f1�ؒu8[�»��qZ$:E�ڢ�4�@R��yMR�v��7c�����;���ڱ���wD��Ī�����y�Kj.E�
�}�3K�?f���Q��� 8�0�.#���*���oݐ������\Չ�*9RHH�Մ]VC�Q��r)�aqu*��һ� �������}�ߕ�Tk�͑*H`2�x�Ɔ�zٙRhH���*-�qMk
r��*�-��d�*Y�{|�*WY��$�u�}.Q/Bn ���s�Su�@ڝ1��1���$e ِ�c��ҋ:H^vÏ$�\\$c����.&�2� ��9%�u�,�ti�:�/�/����L��oI�#���H�+%/i���HR���|����Ԫ�r�w�P|\D#�*��!ٶ���ؐ�eU�kK�O��'9[�i�P��;��%d
�� *3'@0������jϩw�_��,'�D��I���h�.8�cl�2����ޭ�#u��>fQ�TPAL�Y2��tT�К�k_tɴ����5���(�>�ċ�D�"m�����mQޛ:�ְ8�Y�X��Pn����Zt]��9J�e��Ј�.���~I����Üv�z�Je�T�=�l��9H�*�[3� ]��"	�b�;��3Z�x�\R�n�Ln�<H��X��'k�������m��K�#���X+,�y.ȣ	�����k/��p�R����Ό9�U$
�\8�Y�F^�n�nU�;����%-���>��I�o����){�����}�	�b�	��Xݬ�� 4�ws��hΜ0�)�9�^�ts��dGJz�;RP��n���PfR�Za���7�<ol�?���m=�U�|S�f@�֮����X����������T�o�u�KnI�P���Ct�o�n�at	>sv/eN��r�x���`�G0�SϦ�Wn<�`��k���� ��Վ����ad����.�Rɞ��J��(e�=ztV�H���W�d1�5����k�G�Q�Z.�I2:��cFԊun���gP�G@��_grM&^�5ˀ2�>��pa�yp΀ρK���)���V'#hN�1	��L���H�@�N�g�����2�0jc~��f��U�r�%�o0J��i���Љ�������'i2��E'͆�X���>aH2:��,^��e�Pe��l�H��m=hVݭe���"vrp�
��G yR&A�����@J��|H@C??H�#�2@*_@z$�:H�HO���� !S��7(2L���m��qz�@zN���:\@���6������>ϝ����=�$uǈb	�7=h�W���e`B��B}"h9�%�M_�zT�LOs^�/*�4R����TĜ�d��'��ˌD���_���c.���&�=�q��3�FǶMa�%/���lá'*q��23RW��?L:��~�Ϸ��&�L���	{ŀ�8,#z��y"���_4�1cl�c��5q'�;����~E{�-��̙�L��9�5��z鷈��V]Pa�GN������"�d�*�ߙ������_J�'����psG���c>�3������<����S�|��廜�ʄO���Q Tlc����Ꚁ����Y�>s���{�oB�~:s����Sp��=�g���ӟ��4f��L���0�Ƙ��� w�����i��l��������� �)c�-�|m�Nc9L"B����k��� W�8�<o9�	�a��Վ��rA����E�prh�#�QwM|�a�1��A[/���@��g����д�{�f`eOL�m9�,��Ht�e��ލ �F�<r���v�nX�1�k�'��M)����K)�\D�a9�㕳�Q�C��v���!+�=���F3#sϽ�n�|.X���g9L6f�B/�p~OH����0����z�jW�3	T�x�X�/���.��u���Y���&�av6���������I*y,>yH戍�mkB�������07D�	�kD#}�2b�8�m��k�=ܛ�t�;
��j���c�e���6�a�>N��Mw?������C��9e'�������t����ӏ�T8����&s��Y/����>l��z�{>���PA�,�.>�v������?Q�%     